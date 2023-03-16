import { Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/Supabase";
import {
  Styledbox,
  Styledbutton,
  Styledformcontrol,
  Styledtextfield,
} from "./Create";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [name, setname] = useState("");
  const [comments, setComments] = useState("");
  const [cgpa, setCgpa] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("Students")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        setFormError("something went wrong");
      }
      if (data) {
        setname(data.name);
        setComments(data.comments);
        setCgpa(data.cgpa);
      }
    };
    fetchStudent();
  }, [id]);

  const submitHandler = async () => {
    if (!name || !comments || !cgpa) {
      setFormError("All fields are manditory");
      return;
    }
    setFormError(null);

    const fetchStudent = async () => {
      const { error, } = await supabase
        .from("Students")
        .update({ name, comments, cgpa })
        .eq("id", id);

      if (error) {
        setFormError("something went wrong");
      }
      else {
       navigate('/')
      }
    };
    fetchStudent();
  };
  return (
    <Styledbox component="form">
      <Styledformcontrol sx={{ minWidth: 275 }}>
        <Styledtextfield
          color="secondary"
          InputLabelProps={{
            sx: {
              color: "a0a0a0",
            },
          }}
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <Styledtextfield
          color="secondary"
          multiline={true}
          rows={3}
          InputLabelProps={{
            sx: {
              color: "a0a0a0",
            },
          }}
          id="comments"
          label="Comments"
          variant="outlined"
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
        <Rating
          name="simple-controlled"
          value={parseInt(cgpa)}
          onChange={(e) => {
            setCgpa(e.target.value);
          }}
          sx={{ color: "#3cb371", margin: "10px 30px" }}
        />
        {formError && (
          <Typography
            color="red"
            fontSize="small"
            display="flex"
            justifyContent="center"
          >
            All fields are manditory
          </Typography>
        )}
        <Styledbutton
          variant="container"
          onClick={(e) => {
            submitHandler(e);
            e.preventDefault();
          }}
        >
          Update
        </Styledbutton>
      </Styledformcontrol>
    </Styledbox>
  );
}

export default EditPage;
