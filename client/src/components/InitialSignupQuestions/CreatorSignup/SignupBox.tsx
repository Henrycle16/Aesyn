"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UsernameForm from "./UsernameForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";
import SocialMediaSelect from "../SocialMediaSelect";
import NicheSelect from "./NicheSelect";
import GenderForm from "./GenderForm";
import ConfirmForm from "./ConfirmForm";
import ProgressBar from "@/components/ProgressBar";
import { creatorSignUp } from "./../../../actions/creator";
interface CreatorForm {
  user: object;
  userName: string;
  gender: string;
  location: string;
  preferences: string[];
  niche: string[];
}

const creatorFormData: CreatorForm = {
  user: {},
  userName: "",
  gender: "",
  location: "",
  preferences: [],
  niche: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<CreatorForm>(creatorFormData);
  const [isUsernameValid, setUsernameValid] = useState(false);
  const [progress, setProgress] = useState<number>(16.66);
  const [lng, setLng] = useState<number>(-98.5795);
  const [lat, setLat] = useState<number>(39.8283);
  const [zoom, setZoom] = useState<number>(3);
  const [markerLocation, setMarkerLocation] = useState<[number, number] | null>(null);
  const [isLocationSelected, setIsLocationSelected] = useState<boolean>(false);
  const session = useSession();

  useEffect(() => {
    if (session.data && session.status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        user: session.data.user,
      }));
    } else {
      redirect("/login");
    }
  }, [step, session.data, session.status]);

  // Method to handle the next step
  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  // Method to handle the prev step
  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Method to handle the Form Change event
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Method to handle the location change event
  const handleLocationChange = (locationString: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location: locationString,
    }));
  };

  // Method to handle the preference change event
  const handlePreferenceChange = (selected: string) => {
    setFormData((prevData) => {
      const preferences = prevData.preferences.includes(selected)
        ? prevData.preferences.filter((preference) => preference !== selected)
        : [...prevData.preferences, selected];
      return { ...prevData, preferences };
    });
  };

  // Method to handle the niche change event
  const handleNicheChange = (selected: string) => {
    setFormData((prevData) => {
      const niche = prevData.niche.includes(selected)
        ? prevData.niche.filter((niche) => niche !== selected)
        : [...prevData.niche, selected];
      return { ...prevData, niche };
    });
  };

  // Method to submit form
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Split the location string and create the location object
    const [city, state, country] = formData.location.split(",");
    const location = { city, state, country };

    // Create the location object and encapsulate it with the form data
    const { user, userName, gender, niche, preferences } = formData;
    const body = JSON.stringify({
      user,
      userName,
      gender,
      niche,
      preferences,
      location,
    });

    try {
      const creatorSignUpResponse = await creatorSignUp(body);

      if (creatorSignUpResponse && !creatorSignUpResponse.error) {
        console.log("REGISTERED CREATOR!");
        handleNextStep();
      }
    } catch {
      console.log("Error!");
    }
    console.log(formData);

    return;
  };

  const steps = [
    <UsernameForm
      key="userName"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
      isUsernameValid={isUsernameValid}
      setUsernameValid={setUsernameValid}
    />,
    <GenderForm
      key="GenderForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
    />,
    <LocationBox
    key="LocationBox"
    formData={formData}
    handleLocationChange={handleLocationChange}
    lng={lng}
    lat={lat}
    zoom={zoom}
    setLng={setLng}
    setLat={setLat}
    setZoom={setZoom}
    markerLocation={markerLocation}
    setMarkerLocation={setMarkerLocation}
    isLocationSelected={isLocationSelected}
    setIsLocationSelected={setIsLocationSelected}
    handleNextStep={handleNextStep}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
    />,
    <NicheSelect
      key="NicheSelect"
      formData={formData}
      handleNextStep={handleNextStep}
      handleNicheChange={handleNicheChange}
    />,
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
    />,
    <ToDashboard key="ToDashboard" />,
  ];
  useEffect(() => {
    if (step == steps.length - 1) return;
    const totalSteps = steps.length -1;
    const val = ((step + 1) / totalSteps) * 100;
    setProgress(val);
  
  }, [step, steps.length]);

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="min-h-[32rem] flex flex-col p-7 border border-b-0 border-gray-300 rounded-t-md"
      >
        {/* Back Button */}
        <div className="flex">
          {step !== 0 && step !== steps.length -1 && (
            <Button
              onClick={handlePrevStep}
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ padding: "12px 24px" }}
            >
              back
            </Button>
          )}
        </div>

        {/* Render Form Parts Here */}
        <div className="flex-1 flex justify-center">{steps[step]}</div>
      </form>

      {/* Progress Bar */}
      {step !== steps.length -1 && (
        <ProgressBar progress={progress} />
      )}
    </div>
  );
};

export default SignUpBox;
