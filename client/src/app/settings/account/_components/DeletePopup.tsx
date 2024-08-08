"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { deleteCreator } from "@/actions/creatorApi";
import { useSession } from "next-auth/react";

import { userInfo } from "@/redux/slices/user-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const DeletePopup = () => {
  const router = useRouter();
  const session = useSession();

  const handleDelete = () => {
    try {
      deleteCreator(session.data?.user.id)
      console.log("success")
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Grid className="pb-5 flex flex-col items-center">
        <Grid>
          <Typography component="h1" variant="h5">
            Are you sure?
          </Typography>
          <p className="mb-8">
          </p>
        </Grid>
        <Grid>
          <button
            onClick={handleDelete}
            className="ml-4 primary-btn"
          >
            Yes, I'm sure
          </button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeletePopup;
