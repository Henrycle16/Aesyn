"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/creatorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UsernameForm from "./UsernameForm";
import LocationBox from "../../ui/mapbox/LocationBox";
import SocialMediaSelect from "../../ui/SocialMediaSelect";
import InterestSelect from "./InterestSelect";
import GenderForm from "./GenderForm";
import ConfirmForm from "./ConfirmForm";
import ProgressBar from "@/components/ui/ProgressBar";
import { creatorSignUp } from "@/actions/creatorApi"
import ToProfile from "@/components/ui/ToProfile";

import { userInfo } from "@/redux/slices/signUp-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

type Inputs = z.infer<typeof FormDataSchema>;

interface CreatorForm {
  user: object;
  gender: string;
  location: string;
  preferences: string[];
  interests: string[];
}

const creatorFormData: CreatorForm = {
  user: {},
  gender: "",
  location: "",
  preferences: [],
  interests: [],
};

const SignUpBox = () => {
  const [formData, setFormData] = useState<CreatorForm>(creatorFormData);
  const [progress, setProgress] = useState<number>(20);
  const session = useSession();

  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.signUpReducer.value.currentStep);

  useEffect(() => {
    if (session.data && session.status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        user: session.data.user,
      }));
    } else {
      redirect("/login");
    }
  }, [currentStep, session.data, session.status]);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const onBack = () => {
    dispatch(userInfo({ currentStep: currentStep - 1 }));
  }

  const reduxLocation = useAppSelector((state) => state.signUpReducer.value.location);
  const userName = useAppSelector((state) => state.signUpReducer.value.username);
  const gender = useAppSelector((state) => state.signUpReducer.value.gender);
  const preferences = useAppSelector((state) => state.signUpReducer.value.preferences);
  const interests = useAppSelector((state) => state.signUpReducer.value.interests);

  // Method to submit form
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userInfo({ currentStep: currentStep + 1 }));

    // Split the location string and create the location object
    const [city, state, country] = reduxLocation.split(", ");
    const location = { city, state, country };

    // Create the location object and encapsulate it with the form data
    const { user } = formData;
    const body = JSON.stringify({
      user,
      userName,
      gender,
      interests,
      preferences,
      location,
    });

    try {
      const creatorSignUpResponse = await creatorSignUp(body);

      if (creatorSignUpResponse && !creatorSignUpResponse.data.error) {
        console.log("REGISTERED CREATOR!", creatorSignUpResponse.data);
        dispatch(userInfo({ currentStep: currentStep + 1 }));
      }
    } catch {
      console.log("Error!");
    }
    return;
  };

  const steps = [
    <UsernameForm
      key="userName"
      register={register}
      errors={errors}
      getValues={getValues}
    />,
    <GenderForm
      key="GenderForm"
    />,
    <LocationBox
    key="LocationBox"
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
    />,
    <InterestSelect
      key="InterestSelect"
    />,
    <ConfirmForm key="ConfirmForm" />,
    <ToProfile key="ToProfile" />,
  ];

  useEffect(() => {
    if (currentStep == steps.length - 1) return;
    const totalSteps = steps.length - 1;
    const val = ((currentStep + 1) / totalSteps) * 100;
    setProgress(val);
  }, [currentStep, steps.length]);

  const borderStyle = currentStep !== steps.length - 1 ? "border-b-0 " : "rounded-b-md ";

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className={borderStyle + "min-h-[32rem] flex flex-col p-7 border border-gray-300 rounded-t-md"}
      >
        {/* Back Button */}
        <div className="flex">
          {currentStep !== 0 && currentStep !== steps.length - 1 && (
            <Button
              onClick={onBack}
              variant="text"
              startIcon={<ArrowBackIcon />}
              className="ts1-text"
              sx={{ padding: "12px 24px" }}
            >
              back
            </Button>
          )}
        </div>

        {/* Render Form Parts Here */}
        <div className="flex-1 flex justify-center">{steps[currentStep]}</div>
      </form>

      {/* Progress Bar */}
      {currentStep !== steps.length - 1 && <ProgressBar progress={progress} />}
    </div>
  );
};

export default SignUpBox;
