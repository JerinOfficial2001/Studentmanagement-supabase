import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
// import supabase from "./config/Supabase";
import Create from "./screen/Create";
import EditPage from "./screen/EditPage";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Signup from "./screen/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container sx={{ marginTop: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<EditPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
