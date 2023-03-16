import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Stack spacing={2}>
      <CircularProgress color="secondary" />
      <Typography variant="h6">Loading...</Typography>
    </Stack>
  );
}

export default Loader;
