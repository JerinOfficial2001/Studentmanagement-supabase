import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Studentcard from "../Components/Studentcard";
import supabase from "../config/Supabase";

function Home() {
  const [students, setStudents] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const deleteStudent = (id) => {
    setStudents((prevstudents) => {
      return prevstudents.filter((student) => student.id !== id);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("Students")
        .select()
        .order("id", { ascending: false });

      if (error) {
        setFetchError("Something went wrong");
        setStudents(null);
        console.log(error);
      }
      if (data) {
        setStudents(data);
        setFetchError(null);
        console.log(data);
      }
      setIsFetching(false);
    };
    fetchData();
  }, []);
  if (isFetching) {
    return <Loader />;
  }
  return (
    <Grid container spacing={5}>
      {students &&
        students.map((student) => {
          return (
            <Grid item lg={4} xl={4} md={4} sm={6} xs={12} key={student.id}>
              <Studentcard student={student} deleteStudent={deleteStudent} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Home;
