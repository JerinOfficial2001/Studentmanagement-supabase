import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/Supabase";

const Styledcard = styled(Card)({
  minWidth: 150,
  background: "#2d2d2d",
  borderRadius: 5,
  "&:hover": {
    boxShadow: "0px 1px 5px 0px #6dcc93",
    elevation: 20,
  },
});

function Studentcard({ student, deleteStudent }) {
  const deleteHandler = async (id) => {
    await supabase.from("Students").delete().eq("id", id);
    deleteStudent(id);
  };

  const { id, name, comments, cgpa } = student;
  return (
    <Styledcard sx={{ minWidth: 275 }} raised={true} elevation={1}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div" color="#3cb371">
            {name}
          </Typography>
          <Typography variant="body2">{comments}</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="read-only"
              value={parseInt(cgpa)}
              readOnly
              sx={{ color: "#3cb371" }}
            />

            <Stack direction="row">
              <Link to={`/${id}`}>
                <IconButton aria-label="delete" color="secondary">
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => deleteHandler(id)}
              >
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Styledcard>
  );
}

export default Studentcard;
