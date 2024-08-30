"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema } from "@/lib/zod-schemas/personalInfoSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { creatorMyAccountUpdate } from "@/actions/creatorApi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { userEmailUpdate } from "@/actions/userApi";
import { showSuccessToast } from "@/utils/toast/toastEmitters";
import mapboxgl from "mapbox-gl";
import { Geocoder } from "@mapbox/search-js-react";
import { getCreatorByUserId } from "@/actions/creatorApi";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@/styles/mapbox.css";
import { getUserById } from "@/actions/userApi";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/auth-slice";

type Inputs = z.infer<typeof PersonalInfoSchema>;

export default function PersonalInfo() {
  const [location, setLocation] = useState("");
  const [oldLocation, setOldLocation] = useState("");
  const [username, setUsername] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const authStore = useAppSelector((state) => state.authReducer.value)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
  });

  const userCall = async () => {
    await getUserById(session?.user.id).then((res) => {
      if (res.status === 200) {
        console.log("res: ", res);
        setEmail(res.data.email);
        setOldEmail(res.data.email);
      }
    });
  };
  
  const creatorCall = async () => {
    await getCreatorByUserId(session?.user.id).then((res) => {
      if(res.status === 200) {
        setLocation(`${res.data.location.city}, ${res.data.location.state}, ${res.data.location.country}`)
        setOldLocation(`${res.data.location.city}, ${res.data.location.state}, ${res.data.location.country}`)
      }
    })
  }

  useEffect(() => {
    if (status === "authenticated") {
      userCall();
      setUsername(authStore.creatorUsername);
      setOldUsername(authStore.creatorUsername);
      creatorCall();

      console.log("authStore: ", authStore);
      console.log("session: ", session)

      
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [session, status]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    interface LooseObject {
      [key: string]: any;
    }

    const [city, state, country] = location.split(", ");

    const result: LooseObject = {};
    for (const [key, value] of Object.entries(data)) {
      if (key !== "email" && value !== "") {
        result[key] = value;
      } else if (key === "email" && value !== "") {
        const temp = { email: value };
        userEmailUpdate(session?.user.id, temp);
      }
    }
    if (Object.keys(result).length === 0) {
      return;
    }

    if(location != oldLocation){
      result["location"] = {
        city: city,
        state: state,
        country: country
      }
    }

    console.log("Result DATA: ", result);

    try {
      await creatorMyAccountUpdate(session?.user.id, result);

      // Dispatch to auth-slice redux after successful PATCH call to backend
      for (const [key, value] of Object.entries(data)) {
        if (key == "email" && value !== "") {
          dispatch(
            logIn({
              email: value,
            })
          );
          console.log("dispatched email");
        } else if (key == "userName" && value !== "") {
          dispatch(
            logIn({
              creatorUsername: value,
            })
          );
          console.log("dispatched username");
        }
      }

      console.log(authStore)

      showSuccessToast();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>; // or a loading spinner
  }

  const handleUsernameChange = (d: any) => {
    setUsername(d.target.value)
  };
  const handleEmailChange = (d: any) => {
    setEmail(d.target.value);
  };
  const handleLocationChange = (d: any) => {
    setLocation(d.properties.full_address);
  };

  return (
    <section className="border border-gray-300 rounded-badge min-h-[24rem] grid grid-cols-2">
      <div className="col-span-1 p-6">
        <h2 className="subheader2 ts5-text pb-4"> Personal Information </h2>
        <h2 className="body2 ts5-text"> Name </h2>
        <p>
          {authStore.name}
        </p>
        <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h2 className="body2 ts5-text"> Username </h2>
          <div className="relative">
            <input
              className="input-md w-full input-focus-primary"
              type="text"
              id="userName"
              value={username}
              onChangeCapture={handleUsernameChange}
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
                value={email}
                onChangeCapture={handleEmailChange}
                {...register("email")}
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">
              {errors.email?.message}
            </p>
          </div>
          <h2 className="body2 ts5-text"> Location </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              <Geocoder
                accessToken={mapboxgl.accessToken}
                options={{
                  types: "place",
                  country: "US",
                }}
                value={location}
                onRetrieve={handleLocationChange}
              />
              {/* 
              <AddressAutofill>
              <input
                className="input-md w-full input-focus-primary"
                type="text"
                id="location"
                placeholder={storeLocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                name="location"
              />
              </ AddressAutofill>
              */}
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <button
            disabled={
              (oldUsername == username && oldEmail == email && oldLocation == location)
            }
            type="submit"
            className="primary-btn button w-24">
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
