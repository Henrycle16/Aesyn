import React, { useEffect, useReducer, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema } from "@/lib/zod-schemas/personalInfoSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  creatorMyAccountUpdate,
  getCreatorByUserId,
} from "@/actions/creatorApi";
import { userEmailUpdate, getUserById } from "@/actions/userApi";
import { showSuccessToast } from "@/utils/toast/toastEmitters";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/auth-slice";
import GeocoderInput from "./GeocoderInput";
import { AppDispatch } from "@/redux/store";

export default function PersonalInfo() {
  const [oldData, setOldData] = useState({
    username: "",
    location: "",
    email: "",
  });
  const [newData, setNewData] = useState({
    username: "",
    location: "",
    email: "",
  });
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const authStore = useAppSelector((state) => state.authReducer.value);
  const schema = PersonalInfoSchema(authStore.userId);

  type Inputs = z.infer<typeof schema>;

  const { register, handleSubmit, formState, reset, setValue } =
    useForm<Inputs>({
      resolver: zodResolver(schema),
      mode: "onChange",
      defaultValues: { userName: "", email: "" },
    });

  const fetchUserData = async () => {
    const user = await getUserById(session?.user.id);
    const creator = await getCreatorByUserId(session?.user.id);
    const location = `${creator.data.location.city}, ${creator.data.location.state}, ${creator.data.location.country}`;

    setOldData({
      username: creator.data.userName,
      location,
      email: user.data.email,
    });
    setNewData({
      username: creator.data.userName,
      location,
      email: user.data.email,
    });

    // Set form values to fetched data
    setValue("userName", creator.data.userName);
    setValue("email", user.data.email);
  };

  const onReset = () => reset({ userName: "", email: "" });

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, reducerValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result: Record<string, any> = {};
    const email: Record<string, string> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === "email" && value) email[key] = value;
      else if (value) result[key] = value;
    });

    if (newData.location !== oldData.location) {
      const [city, state, country] = newData.location.split(", ");
      result["location"] = { city, state, country };
    }

    try {
      if (Object.keys(email).length) {
        await userEmailUpdate(session?.user.id, email);
      }
      await creatorMyAccountUpdate(session?.user.id, result);
      showSuccessToast();
      onReset();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "email" && value != "") {
          setOldData((prev) => ({ ...prev, email: value }));
          dispatch(logIn({ email: value }));
        } else if (key === "userName" && value != "") {
          setOldData((prev) => ({ ...prev, username: value }));
          dispatch(logIn({ creatorUsername: value }));
        }
      });

      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  const handleLocationChange = (location: string) =>
    setNewData((prev) => ({ ...prev, location }));

  const isSaveDisabled =
    (oldData.username === newData.username &&
      oldData.email === newData.email &&
      oldData.location === newData.location) ||
    newData.location === "";

  return (
    <section className="border border-gray-300 rounded-badge min-h-[24rem] grid grid-cols-2">
      <div className="col-span-1 p-6">
        <div className="mb-4">
          <h2 className="subheader2 ts5-text pb-4">Personal Information</h2>
          <p className="body2 ts5-text">Name</p>
          <p>{authStore.name}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4">
          <div>
            <label className="body2 ts5-text" htmlFor="userName">
              Username
            </label>
            <input
              className="input-md w-full input-focus-primary"
              type="text"
              id="userName"
              {...register("userName", {
                onChange: (e) =>
                  setNewData((prev) => ({ ...prev, username: e.target.value })),
              })}
            />
            <p className="mt-1 text-sm ts8-text">
              {formState.errors.userName?.message}
            </p>
          </div>

          <div>
            <label className="body2 ts5-text" htmlFor="email">
              Contact email
            </label>
            <input
              className="input-md w-full input-focus-primary"
              type="email"
              id="email"
              {...register("email", {
                onChange: (e) =>
                  setNewData((prev) => ({ ...prev, email: e.target.value })),
              })}
            />
            <p className="mt-1 text-sm ts8-text">
              {formState.errors.email?.message}
            </p>
          </div>

          <div>
            <label className="body2 ts5-text" htmlFor="location">
              Location
            </label>
            <GeocoderInput
              className="input-md w-full input-focus-primary"
              initialLocation={newData.location}
              handleLocationChange={handleLocationChange}
              disableInput={false}
            />
          </div>

          <button
            type="submit"
            className="primary-btn button w-24"
            disabled={isSaveDisabled}>
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
