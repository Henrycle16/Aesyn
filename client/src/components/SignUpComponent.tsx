"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";

const SignUpComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != password2) {
      console.log("Passwords do not match!");
      return;
    } else {
      try {
        const signUpResponse = await signIn("sign-up", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          redirect: false,
        });

        if (signUpResponse && !signUpResponse.error) {
          console.log("User succesfully signed up");
          console.log(signUpResponse);

          if (state === "true") {
            router.push("/signup/brand");
          } else {
            router.push("/signup/creator");
          }
        } else {
          console.log("Error!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-2"
    >
      {/* Form Header */}
      <div className="mx-auto mt-16 flex flex-col items-center">
        <Avatar className="m-1 bg-blue-500">
          <PersonPinOutlinedIcon />
        </Avatar>
        <h1 className="text-2xl">Sign Up</h1>
      </div>

      {/* Input Fields */}
      <div className="mt-5 flex gap-4">
        <input
          type="text"
          className="input-md border border-gray-300 rounded-sm w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
          placeholder="First Name*"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={onChange}
          autoFocus
          autoComplete="given-name"
          required
        />
        <input
          type="text"
          className="input-md border border-gray-300 rounded-sm w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
          placeholder="Last Name*"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={onChange}
          autoComplete="family-name"
          required
        />
      </div>
      <input
        type="email"
        className="input-md border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
        placeholder="Email Address*"
        name="email"
        id="email"
        value={email}
        onChange={onChange}
        autoComplete="email"
        required
      />
      <input
        type="password"
        className="input-md border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
        placeholder="Password*"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
        autoComplete="new-password"
        required
      />
      <input
        type="password"
        className="input-md border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
        placeholder="Confirm Password*"
        name="password2"
        id="password2"
        value={password2}
        onChange={onChange}
        autoComplete="new-password"
        required
      />

      {/* Checkboxes */}
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1" />
        <p className="text-sm">
          By signing up, you agree to our{" "}
          <Link href={""} className="no-underline">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href={""} className="no-underline">
            Privacy Policy
          </Link>
          .<span className="text-red-500">*</span>
        </p>
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1" />
        <p className="text-sm">
          I want to receive inspiration, marketing promotions and updates via
          email.
        </p>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="py-3 bg-muiblue"
      >
        Sign Up
      </Button>

      <div className="flex">
        <Link href={"/login"} className="text-sm ml-auto">
          Already have an account? Log in
        </Link>
      </div>

      <div className="flex pt-16 pb-1">
        <p className="mx-auto text-sm text-gray-500">
          Copyright ©{" "}
          <Link href={"/"} className="text-gray-500">
            ShareFluence
          </Link>{" "}
          {new Date().getFullYear()}.
        </p>
      </div>
    </form>
  );
};

export default SignUpComponent;
