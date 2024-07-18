"use client";

import React from "react";
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
    <Container>
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
            className="primary-btn"
          >
            Join as Brand!
          </Link>
          <Link
            onClick={onClickCreator}
            href={"/signup"}
            className="ml-4 secondary-btn"
          >
            Join as Creator!
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPopup;
