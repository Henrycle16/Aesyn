"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // callbackURL placeholder for now
    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error) {
      console.log("Authenticated!");
      // Function to call post to replace password
    } else {
      console.log("Error!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <section className="border border-gray-300 rounded-badge min-h-[24rem] grid grid-cols-2">
      <div className="col-span-1 p-8">
        <h2 className="subheader2 ts5-text"> Password </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <div className="mt-5">
            <h2 className="body2 ts5-text"> Current Password </h2>

            <div className="relative">
              <div className="flex flex-row items-center justify-between">
                <input
                  className="input-md w-full input-focus-primary"
                  type={showPassword ? "text" : "password"}
                  id="oldPassword"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  name="password"
                  autoFocus
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 pr-3 text-sm leading-5"
                >
                  {showPassword ? (
                    <VisibilityOffIcon className="h-5 w-5 g5-text" />
                  ) : (
                    <VisibilityIcon className="h-5 w-5 g5-text" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
            </div>
          </div>
          <div className="relative">
            <h2 className="body2 ts5-text"> New Password </h2>
            <div className="flex flex-row items-center justify-between">
              <input
                className="input-md w-full input-focus-primary"
                type={showPassword1 ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                autoFocus
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility1}
                className="absolute right-0 pr-3 text-sm leading-5"
              >
                {showPassword1 ? (
                  <VisibilityOffIcon className="h-5 w-5 g5-text" />
                ) : (
                  <VisibilityIcon className="h-5 w-5 g5-text" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <div className="relative">
            <h2 className="body2 ts5-text"> Confirm Password </h2>
            <div className="flex flex-row items-center justify-between">
              <input
                className="input-md w-full input-focus-primary"
                type={showPassword2 ? "text" : "password"}
                id="password2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword2(e.target.value)
                }
                autoFocus
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="absolute right-0 pr-3 text-sm leading-5"
              >
                {showPassword2 ? (
                  <VisibilityOffIcon className="h-5 w-5 g5-text" />
                ) : (
                  <VisibilityIcon className="h-5 w-5 g5-text" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
        </form>

        <Button type="submit" variant="contained" className="ts1-bg w-24">
          Save
        </Button>
      </div>
    </section>
  );
};

export default PasswordInfo;
