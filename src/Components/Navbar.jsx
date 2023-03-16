import { AppBar, Stack, styled, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Styledtoolbar = styled(Toolbar)({
  justifyContent: "space-between",
  maxWidth: 1200,
  margin: "auto",
  width: "100%",
});
const Styledlink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

function Navbar() {
  return (
    <AppBar position="sticky">
      <Styledtoolbar>
        <Stack direction="row" color="pink" alignItems="center">
          <img
            src={require("../assets/Logo-bg.png")}
            alt=""
            height="60"
            width="80"
          />
          <Typography variant="h8">(Student Management)</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Styledlink to="/">
            <Typography variant="h6">Home</Typography>
          </Styledlink>
          <Styledlink to="/create">
            <Typography variant="h6">Create</Typography>
          </Styledlink>
        </Stack>
      </Styledtoolbar>
    </AppBar>
  );
}

export default Navbar;
