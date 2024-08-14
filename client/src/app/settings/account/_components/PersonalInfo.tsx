"use clients";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { getCreatorByUsername } from "@/actions/creatorApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema } from "@/lib/zod-schemas/personalInfoSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { creatorMyAccountUpdate } from "@/actions/creatorApi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { userEmailUpdate } from "@/actions/userApi";

type Inputs = z.infer<typeof PersonalInfoSchema>;

export default function PersonalInfo() {
  const [location, setLocation] = useState("");
  const session = useSession();

  useEffect(() => {
    if (!session.data && session.status === "unauthenticated") {
      redirect("/login");
    }
  }, [session.data, session.status]);

  // redux store
  const authStore = useAppSelector((state) => state.authReducer.value);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    interface LooseObject {
      [key: string]: any
    }

    // Parses out the empty values
    const result: LooseObject = {}
    for (const [key, value] of Object.entries(data)) {
      if(key !== 'email' && value !== '') {
        result[key] = value
      } else if(key === 'email' && value !== ''){
        const temp = {email: value}
        userEmailUpdate(session.data?.user.id, temp);
      }
    }
    if(Object.keys(result).length == 0){
      return;
    }

    try {
      creatorMyAccountUpdate(session.data?.user.id, result);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <section className="border border-gray-300 rounded-badge min-h-[24rem] grid grid-cols-2">
      <div className="col-span-1 p-6">
        <h2 className="subheader2 ts5-text pb-4"> Personal Information </h2>
        <h2 className="body2 ts5-text"> Name </h2>
        <p>{authStore.name}</p>
        <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h2 className="body2 ts5-text"> Username </h2>
          <div className="relative">
            <input
              className="input-md w-full input-focus-primary"
              type="text"
              id="userName"
              placeholder="Type here"
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              {...register("userName")}
            />
            <p className="mt-1 text-sm min-h-5 ts8-text">
              {errors.userName?.message}
            </p>
          </div>
          <h2 className="body2 ts5-text"> Contact email </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              <input
                className="input-md w-full input-focus-primary"
                type="email"
                id="email"
                placeholder={authStore.email}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                {...register("email")}
                name="email"
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">
              {errors.email?.message}
            </p>
          </div>
          <h2 className="body2 ts5-text"> Location </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              <input
                className="input-md w-full input-focus-primary"
                type="text"
                id="location"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                name="location"
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <button disabled={(!getValues("userName") && !getValues("email")) || !!errors.userName || !!errors.email} type="submit" className="primary-btn button w-24">
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
