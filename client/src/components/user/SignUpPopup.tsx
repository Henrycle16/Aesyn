"use client";

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

import { userInfo } from "@/redux/slices/user-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const SignUpPopup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onClickCreator = () => {
    dispatch(userInfo({ isCreator: true, isBrand: false }));
    router.push("/signup");
  }
  
  const onClickBrand = () => {
    dispatch(userInfo({ isBrand: true, isCreator: false }));
    router.push("/signup");
  }

  return (
    <Container >
      <CssBaseline />
      <Grid className="pb-5 flex flex-col items-center">
        <Grid>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <p className="mb-8 leading-relaxed">
            Choose which type of account you would like to sign up for.
          </p>
        </Grid>
        <Grid>
          <Link
            onClick={onClickBrand}
            href={"/signup"}
            className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Join as Brand!
          </Link>
          <Link
            onClick={onClickCreator}
            href={"/signup"}
            className="ml-4 inline-flex text-blue-500 border-solid border-2 border-blue-500 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
          >
            Join as Creator!
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPopup;
