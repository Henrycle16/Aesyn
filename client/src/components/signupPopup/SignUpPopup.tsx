"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

const SignUpPopup = ({handleClick}) => {
  const router = useRouter();

  const handleBrandSignup = () => {
    router.push(`/signup?state=${true}`);
  };

  const handleCreatorSignup = () => {
   router.push(`/signup?state=${false}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="mt-8 flex flex-col items-center">
        <Avatar className="m-1 bg-blue-500">
          <PersonPinOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <button onClick={handleBrandSignup} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Join as Brand!</button>
        <button onClick={handleCreatorSignup} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Join as Creator!</button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2" onClick={() => handleClick()}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ paddingTop: "20px" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://github.com/H2JC/H2JC">
          H2JC
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};

export default SignUpPopup;
