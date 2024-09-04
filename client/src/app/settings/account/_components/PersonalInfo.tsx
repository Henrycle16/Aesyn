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

export default function PersonalInfo() {
  const [oldData, setOldData] = useState({
    username: "",
    location: "",
    email: ""
  });
  const [newData, setNewData] = useState({
    username: "",
    location: "",
    email: ""
  });
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const authStore = useAppSelector((state) => state.authReducer.value)

  const schema = PersonalInfoSchema(authStore.userId)

  type Inputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      userName: "",
      email: ""
    }
  });

  // Function to call user and creator data
  const apiCall = async () => {
    const user = await getUserById(session?.user.id);
    const creator = await getCreatorByUserId(session?.user.id);
    setOldData({
      username: creator.data.userName,
      location: `${creator.data.location.city}, ${creator.data.location.state}, ${creator.data.location.country}`,
      email: user.data.email,
    });
    setNewData({
      username: creator.data.userName,
      location: `${creator.data.location.city}, ${creator.data.location.state}, ${creator.data.location.country}`,
      email: user.data.email,
    });
  };

  // Resets zod form validator values
  const onReset = async () => {
    reset({
      userName: "",
      email: ""
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      apiCall();
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
   
    // Break apart data since email has to go into a different call.
    for (const [key, value] of Object.entries(data)) {
      if (key !== "email" && value !== "") {
        result[key] = value;
      } else if (key === "email" && value !== "") {
        email[key] = value;
      }
    }

    // Adds location into results object
    if(newData.location != oldData.location){
      const [city, state, country] = newData.location.split(", ");

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
        if(key == "email" && value != ""){
          dispatch(
            logIn({
              email: value,
            })
          );
          setOldData({
            ...oldData,
            email: value
          })
        } else if(key == "userName" && value != ""){
          dispatch(
            logIn({
              creatorUsername: value,
            })
          );
          setOldData({
            ...oldData,
            username: value
          });
        }
      }

      // Function to rerender component to reset button
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>; // or a loading spinner
  }

  const handleUsernameChange = (d: any) => {
    setNewData({
      ...newData,
      username: d.target.value
    })
  };
  const handleEmailChange = (d: any) => {
    setNewData({
      ...newData,
      email: d.target.value
    })
  };
  const handleLocationChange = (d: any) => {
    setNewData({
      ...newData,
      location: d.properties.full_address
    })
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
              value={newData.username}
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
                value={newData.email}
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
                value={newData.location}
                onRetrieve={handleLocationChange}
                
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <button
            disabled={
              (oldData.username == newData.username && oldData.email == newData.email && oldData.location == newData.location)
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
