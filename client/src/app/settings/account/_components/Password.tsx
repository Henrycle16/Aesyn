"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "@/lib/zod-schemas/passwordResetSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { userPasswordUpdate } from "@/actions/userApi";
import { showSuccessToast } from "@/utils/toast/toastEmitters";
import { getUserById } from "@/actions/userApi";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Inputs = z.infer<typeof PasswordResetSchema>;

const PasswordInfo = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");

  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  const userCall = async () => {
    await getUserById(session?.user.id).then((res) => {
      if (res.status === 200) {
        setEmail(res.data.email);
      }
    });
  };

  useEffect(() => {
    userCall();
  }, [session, status]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(PasswordResetSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("SESSION: ", session?.user.email);

    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error) {
      try {
        console.log("Authenticated!");
        interface LooseObject {
          [key: string]: any;
        }
        const result: LooseObject = {};
        // Function to call post to replace password
        for (const [key, value] of Object.entries(data)) {
          if (key === "password" && value !== "") {
            result[key] = value;
          }
        }
        setLoginErrors("");
        userPasswordUpdate(session?.user.id, result);
        showSuccessToast();
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoginErrors("Wrong Password!")
      console.log("Wrong Password!");
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
      <div className="col-span-1 p-6">
        <h2 className="subheader2 ts5-text"> Password </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                  className="absolute right-0 pr-3 text-sm leading-5">
                  {showPassword ? (
                    <VisibilityIcon className="h-5 w-5 g5-text" />
                  ) : (
                    <VisibilityOffIcon className="h-5 w-5 g5-text" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm min-h-5 ts8-text">{loginErrors}</p>
            </div>
          </div>
          <div className="relative">
            <h2 className="body2 ts5-text"> New Password </h2>
            <div className="flex flex-row items-center justify-between">
              <input
                type={showPassword1 ? "text" : "password"}
                className="input-md w-full input-focus-primary pr-10"
                placeholder="Password*"
                id="password"
                {...register("password")}
                autoComplete="new-password"
                maxLength={50}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility1}
                className="absolute right-0 pr-3 text-sm leading-5">
                {showPassword1 ? (
                  <VisibilityIcon className="h-5 w-5 g5-text" />
                ) : (
                  <VisibilityOffIcon className="h-5 w-5 g5-text" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">
              {errors.password?.message}
            </p>
          </div>
          <div className="relative">
            <h2 className="body2 ts5-text"> Confirm Password </h2>
            <div className="flex flex-row items-center justify-between">
              <input
                type={showPassword2 ? "text" : "password"}
                className="input-md w-full input-focus-primary"
                placeholder="Confirm Password*"
                id="password2"
                {...register("password2")}
                autoComplete="new-password"
                maxLength={50}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="absolute right-0 pr-3 text-sm leading-5">
                {showPassword2 ? (
                  <VisibilityIcon className="h-5 w-5 g5-text" />
                ) : (
                  <VisibilityOffIcon className="h-5 w-5 g5-text" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">
              {errors.password2?.message}
            </p>
          </div>
          <button
            disabled={
              !getValues("password") ||
              !getValues("password2") ||
              !!errors.password ||
              !!errors.password2
            }
            type="submit"
            className="primary-btn button w-24">
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default PasswordInfo;
