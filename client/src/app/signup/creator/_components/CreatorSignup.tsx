"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/creatorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UsernameForm from "./CreatorSignup/UsernameForm";
import LocationBox from "../../_components/mapbox/LocationBox";
import SocialMediaSelect from "../../_components/SocialMediaSelect";
import InterestSelect from "./CreatorSignup/InterestSelect";
import GenderForm from "./CreatorSignup/GenderForm";
import ConfirmForm from "./CreatorSignup/ConfirmForm";
import ProgressBar from "@/components/ui/ProgressBar";
import { creatorSignUp } from "@/actions/creatorApi";
import ToProfile from "@/app/signup/creator/_components/CreatorSignup/ToProfile";

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
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useAppSelector(
    (state) => state.signUpReducer.value.currentStep
  );

  // Fetch user data from session once authenticated
  useEffect(() => {
    if (session && status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        user: session.user,
      }));
    } else if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [session, status, currentStep]);

  const { register, getValues, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  // Handle going back to the previous step
  const onBack = () => {
    dispatch(userInfo({ currentStep: currentStep - 1 }));
  };

  const reduxLocation = useAppSelector(
    (state) => state.signUpReducer.value.location
  );
  const userName = useAppSelector(
    (state) => state.signUpReducer.value.username
  );
  const gender = useAppSelector((state) => state.signUpReducer.value.gender);
  const preferences = useAppSelector(
    (state) => state.signUpReducer.value.preferences
  );
  const interests = useAppSelector(
    (state) => state.signUpReducer.value.interests
  );

  // Method to submit form
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userInfo({ currentStep: currentStep + 1 }));

    // Process the location and prepare the payload
    const [city, state, country] = reduxLocation.split(", ");
    const location = { city, state, country };
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
      } else {
        console.log("API Error:", creatorSignUpResponse.data.error);
      }
    } catch (error) {
      console.log("Error during submission:", error);
    }
  };

  // Render the current step based on the step number
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <UsernameForm
            key="userName"
            register={register}
            errors={errors}
            getValues={getValues}
          />
        );
      case 1:
        return <GenderForm key="GenderForm"  />;
      case 2:
        return <LocationBox  key="LocationBox" />;
      case 3:
        return <SocialMediaSelect  key="SocialMediaSelect" />;
      case 4:
        return <InterestSelect  key="InterestSelect" />;
      case 5:
        return <ConfirmForm  key="ConfirmForm" />;
      case 6:
        return <ToProfile key="ToProfile"/>;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (currentStep == 6) return;
    const totalSteps = 6;
    const val = ((currentStep + 1) / totalSteps) * 100;
    setProgress(val);
  }, [currentStep]);

  const borderStyle = currentStep !== 6 ? "border-b-0 " : "rounded-b-md ";

  // Render component conditionally based on session status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmitForm}
          className={
            borderStyle +
            "min-h-[32rem] flex flex-col p-7 border border-gray-300 rounded-t-md"
          }>
          {/* Back Button */}
          <div className="flex">
            {currentStep !== 0 && currentStep !== 6 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
                className="back-btn flex items-center"
                style={{ padding: "12px 24px", cursor: "pointer" }}>
                <ArrowBackIcon style={{ marginRight: "8px" }} />
                Back
              </button>
            )}
          </div>

          {/* Render Form Parts Here */}
          <div className="flex-1 flex justify-center">{renderStep()}</div>
        </form>

        {/* Progress Bar */}
        {currentStep !== 6 && <ProgressBar progress={progress} />}
      </div>
    );
  }
  return <div>You need to be logged in to access this page.</div>;
};

export default SignUpBox;
