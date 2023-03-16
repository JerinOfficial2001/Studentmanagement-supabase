import {
  Button,
  FormControl,
  Rating,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/Supabase";

export const Styledbox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
});
export const Styledformcontrol = styled(FormControl)({
  background: "#2d2d2d",
  margin: "20px 10px",
  borderRadius: 5,
  minWidth: 500,
  maxWidth: 500,
});
export const Styledtextfield = styled(TextField)({
  margin: "20px 20px",
});
export const Styledbutton = styled(Button)({
  margin: "20px 40%",
  background: "#3cb371",
});
function Create() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    comments: "",
    cgpa: 0,
  });
  const { name, comments, cgpa } = inputData;
  const submitHandler = async () => {
    if (!name || !comments || !cgpa) {
      setFormError("All fields are manditory");
      return;
    } else {
      setFormError(null);
      setInputData({
        name: "",
        comments: "",
        cgpa: 2,
      });
    }
    // const { name, comments, cgpa } = data;

    const { error } = await supabase
      .from("Students")
      .insert({ name, comments, cgpa });
    if (error) {
      console.log(error);
      setFormError("All fields are manditory");
    } else {
      setFormError(null);
      navigate("/");
    }
    console.log(name, comments, cgpa);
  };
  return (
    <Styledbox component="form">
      <Styledformcontrol>
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
            setInputData({ ...inputData, name: e.target.value });
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
            setInputData({ ...inputData, comments: e.target.value });
          }}
        />
        <Rating
          name="simple-controlled"
          value={parseInt(cgpa)}
          onChange={(e) => {
            setInputData({ ...inputData, cgpa: e.target.value });
          }}
          sx={{ color: "#3cb371", margin: "10px 30px" }}
        />
        {formError && <Typography>Error</Typography>}
        <Styledbutton
          variant="container"
          onClick={(e) => {
            submitHandler(e);
            e.preventDefault();
          }}
        >
          Submit
        </Styledbutton>
      </Styledformcontrol>
    </Styledbox>
  );
}

export default Create;
