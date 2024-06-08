"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { userInfo } from "@/redux/slices/user-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type Inputs = z.infer<typeof FormDataSchema>;

const SignUpComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const isBrand = useAppSelector((state) => state.userInfoReducer.value.isBrand);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const signUpResponse = await signIn("sign-up", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        promotional: data.promotional,
        acceptedTerms: data.acceptedTerms,
        redirect: false,
      });

      dispatch(userInfo({ email: data.email}));

      if (signUpResponse && !signUpResponse.error) {
        console.log("User succesfully signed up");
        console.log(signUpResponse);
        console.log("isBrand: ", isBrand)

        if (isBrand) {
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
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-1"
    >
      {/* Form Header */}
      <div className="mx-auto mt-16 flex flex-col items-center">
        <Avatar className="m-1 bg-blue-500">
          <PersonPinOutlinedIcon />
        </Avatar>
        <h1 className="text-2xl">Sign Up</h1>
      </div>

      {/* Input Fields */}
      <div className="mt-5">
        <input
          type="text"
          className="w-full input-md border border-gray-300 rounded-md"
          placeholder="First Name*"
          id="firstName"
          {...register("firstName")}
          autoFocus
          autoComplete="given-name"
        />
        <p className="mt-1 text-sm text-red-400 min-h-5">
          {errors.firstName?.message}
        </p>
      </div>
      <div>
        <input
          type="text"
          className="w-full input-md border border-gray-300 rounded-md"
          placeholder="Last Name*"
          id="lastName"
          {...register("lastName")}
          autoComplete="family-name"
        />
        <p className="mt-1 text-sm text-red-400 min-h-5">
          {errors.lastName?.message}
        </p>
      </div>
      <div>
        <input
          type="email"
          className="w-full input-md border border-gray-300 rounded-md"
          placeholder="Email Address*"
          id="email"
          {...register("email")}
          autoComplete="email"
        />
        <p className="mt-1 text-sm text-red-400 min-h-5">
          {errors.email?.message}
        </p>
      </div>
      <div>
        <input
          type="password"
          className="w-full input-md border border-gray-300 rounded-md"
          placeholder="Password*"
          id="password"
          {...register("password")}
          autoComplete="new-password"
          maxLength={50}
        />
        <p className="mt-1 text-sm text-red-400 min-h-5">
          {errors.password?.message}
        </p>
      </div>
      <div>
        <input
          type="password"
          className="w-full input-md border border-gray-300 rounded-md"
          placeholder="Confirm Password*"
          id="password2"
          {...register("password2")}
          autoComplete="new-password"
          maxLength={50}
        />
        {errors.password2?.message && (
          <p className="mt-1 text-sm text-red-400">
            {errors.password2.message}
          </p>
        )}
      </div>

      {/* Checkboxes */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1"
          id="acceptedTerms"
          {...register("acceptedTerms")}
        />
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
      <div>
      {errors.acceptedTerms?.message && (
          <p className="mt-1 text-sm text-red-400">{errors.acceptedTerms.message}</p>
        )}
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1"
          id="promotional"
          {...register("promotional")}
        />
        <p className="text-sm">
          I want to receive inspiration, marketing promotions and updates via
          email.
        </p>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="py-2 bg-muiblue mt-5"
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
