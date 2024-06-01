"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

interface Props {
  handleClick: Function;
  // any props that come into the component
}

const SignUpPopup = () => {
  const router = useRouter();

  const handleBrandSignup = () => {
    router.push(`/signup?state=${true}`);
  };

  const handleCreatorSignup = () => {
    router.push(`/signup?state=${false}`);
  };

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
            href={{
              pathname: "/signup",
              query: { state: true },
            }}
            className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Join as Brand!
          </Link>
          <Link
            href={{
              pathname: "/signup",
              query: { state: false },
            }}
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
