"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      await axios.post("http://localhost:5000/api/users", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User succesfully signed up")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          label="First Name"
          autoFocus
        />
        <TextField
          required
          fullWidth
          id="lastName"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
        <TextField
          required
          fullWidth
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          autoComplete="new-password"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpComponent;
