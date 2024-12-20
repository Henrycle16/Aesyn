"use client";

import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import { signIn } from "next-auth/react";
import SignUpPopup from "./Login/SignUpPopup";
import SignUpModal from "./Login/SignUpModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCreatorByUserId } from "@/actions/creatorApi";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/auth-slice";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  

  const redirecting = async (userId: string) => {
      const creator = await getCreatorByUserId(userId)
      //const brand = await getBrandByUserId(userId)
      if(creator)
      {
        dispatch(
          logIn({
            email: email,
            creatorUsername: creator.data.userName,
            creatorId: creator.data._id
          })
        );
        router.push(`/profile/${creator.data.userName}`)
      }
      // else if(brand) {
      //   router.push(DASHBOARD)
      // }
  }

  useEffect(() => {
    if(session.data?.user.id != null){
      redirecting(session.data?.user.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data, session.status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error) {
      setErrors("");
      // console.log("Successful login!");
      // console.log(loginResponse);
    } else {
      console.log("Error!");
      setErrors("Incorrect email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-1">
        {/* Form Header */}
        <div className="mx-auto mt-16 flex flex-col items-center">
          <Avatar className="m-1 bg-blue-500">
            <PersonPinOutlinedIcon />
          </Avatar>
          <h1 className="text-2xl">Login</h1>
        </div>

        {/* Input Fields */}
        <div className="mt-5">
          <input
            className="input-md w-full input-focus-primary"
            type="text"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            name="email"
            autoFocus
            autoComplete="email"
            required
          />
          <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
        </div>
        <div className="relative">
          <div className="flex flex-row items-center justify-between">
            <input
              className="input-md w-full input-focus-primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors("");
              }}
              name="password"
              autoFocus
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 pr-3 text-sm leading-5">
              {showPassword ? (
                <VisibilityIcon className="h-5 w-5 g5-text" />
              ) : (
                <VisibilityOffIcon className="h-5 w-5 g5-text" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm min-h-5 ts8-text">{errors}</p>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-3 mb-2 ts1-bg">
          Login
        </Button>

        <button
          onClick={() =>
            (
              document.getElementById("sign-up-modal") as HTMLDialogElement
            ).showModal()
          }>
          <Link href="#">Don&apos;t have an account? Sign up</Link>
        </button>

        <div className="flex pt-16 pb-1">
          <p className="mx-auto text-sm g4-text">
            Copyright ©{" "}
            <Link href={"/"} className="g4-text">
              Aeśyn
            </Link>{" "}
            {new Date().getFullYear()}.
          </p>
        </div>
      </form>
      <SignUpModal>
        <SignUpPopup />
      </SignUpModal>
    </>
  );
};

export default LoginComponent;
