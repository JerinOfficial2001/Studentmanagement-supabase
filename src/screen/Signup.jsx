import {
  Button,
  FormControl,
  Link,
  Stack,
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
  margin: "20px 26%",
  background: "#3cb371",
  width: 200,
});
const Styledstack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});
function Signup() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = inputData;
  const submitHandler = async () => {
    if (!name || !email || !password) {
      setFormError("All fields are manditory");
      return;
    } else {
      setFormError(null);
      setInputData({
        name: "",
        email: "",
        password: "",
      });
    }
    // const { name, comments, cgpa } = data;

    try {
      await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          },
        },
      });
      alert("check your email for verification");
    } catch (error) {
      alert(error);
    }

    console.log(name, email, password);
  };
  return (
    <Styledbox component="form">
      <Styledformcontrol sx={{ minWidth: 400 }}>
        <Styledtextfield
          color="secondary"
          InputLabelProps={{
            sx: {
              color: "a0a0a0",
            },
          }}
          id="name"
          type="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setInputData({ ...inputData, name: e.target.value });
          }}
        />
        <Styledtextfield
          color="secondary"
          InputLabelProps={{
            sx: {
              color: "a0a0a0",
            },
          }}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setInputData({ ...inputData, email: e.target.value });
          }}
        />
        <Styledtextfield
          color="secondary"
          InputLabelProps={{
            sx: {
              color: "a0a0a0",
            },
          }}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setInputData({ ...inputData, password: e.target.value });
          }}
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
          Create Account
        </Styledbutton>
        <Styledstack>
          <Typography>Already have an account?</Typography>
          <Link
            href="#"
            underline="hover"
            color="blue"
            onClick={() => {
              navigate("/login");
            }}
          >
            {"Log in"}
          </Link>
        </Styledstack>
      </Styledformcontrol>
    </Styledbox>
  );
}

export default Signup;
