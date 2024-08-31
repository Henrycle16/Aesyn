"use client";

import React, { useEffect, useReducer, useState } from "react";
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
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const authStore = useAppSelector((state) => state.authReducer.value)

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
    defaultValues: {
      userName: "",
      email: ""
    }
  });

  const userCall = async () => {
    await getUserById(session?.user.id).then((res) => {
      if (res.status === 200) {
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
        setUsername(res.data.userName);
        setOldUsername(res.data.userName);
      }
    })
  }

  const onReset = async () => {
    reset({
      userName: "",
      email: ""
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      creatorCall();
      userCall();
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [session, status, reducerValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    interface LooseObject {
      [key: string]: any;
    }

    const result: LooseObject = {};
    const email : LooseObject = {};
   
    for (const [key, value] of Object.entries(data)) {
      if (key !== "email" && value !== "") {
        result[key] = value;
      } else if (key === "email" && value !== "") {
        email[key] = value;
      }
    }

    if(location != oldLocation){
      const [city, state, country] = location.split(", ");

      result["location"] = {
        city: city,
        state: state,
        country: country
      }
    }

    try {
      if (email != null) {
        await userEmailUpdate(session?.user.id, email);
      }
      await creatorMyAccountUpdate(session?.user.id, result);
      showSuccessToast();
      onReset();
      // Dispatch to auth-slice redux after successful PATCH call to backend
      for (const [key, value] of Object.entries(data)) {
        if(key === "email"){
          setOldEmail(value)
        } else if(key === "userName"){
          setOldUsername(value)
        }
        dispatch(
          logIn({
            [key]: value,
          })
        );
      }

      forceUpdate();
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
              {formState.errors.userName?.message}
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
              {formState.errors.email?.message}
            </p>
          </div>
          <h2 className="body2 ts5-text"> Location </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              <Geocoder
                
                accessToken={mapboxgl.accessToken}theme={{
                  variables: {
                    boxShadow: '0 0 0 1px #d7d7d7',
                  }
                }}
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
