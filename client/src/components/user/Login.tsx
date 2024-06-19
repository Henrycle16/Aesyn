"use client";

import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import SignUpPopup from "./SignUpPopup";
import { useSession } from "next-auth/react";
import SignUpModal from "../user/SignUpModal";
import { useSession } from "next-auth/react";

import { logIn, logOut } from "@/redux/slices/auth-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { useAppSelector } from "@/redux/store";


const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const session = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error) {
      console.log("LOGIN!");

      dispatch(logIn(session.data?.user.id));


      dispatch(logIn(session.data?.user.id));

      console.log(loginResponse);
    } else {
      console.log("Error!");
    }
  };

  const onClickLogOut = () => {
    dispatch(logOut());
    signOut({ redirect: false });
  }

  return (
    <Container component="main" maxWidth="xs">
      <SignUpModal>
        <SignUpPopup />
      </SignUpModal>
      <Box className="mt-8 flex flex-col items-center">
        <Avatar className="m-1 bg-blue-500">
          <PersonPinOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          className="mt-3"
          component="form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2} className="pb-6">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-3 mb-2 bg-muiblue"
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            className="mt-3 mb-2 bg-muiblue"
            onClick={onClickLogOut}
          >
            Sign Out
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <button
                onClick={() =>
                  document.getElementById("sign-up-modal").showModal()
                }
              >
                <Link href="#">Don&apos;t have an account? Sign up</Link>
              </button>
            </Grid>
          </Grid>
        </Box>
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

export default LoginComponent;
