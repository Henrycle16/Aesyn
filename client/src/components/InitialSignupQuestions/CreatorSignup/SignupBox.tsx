"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UsernameForm from "./UsernameForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";
import SocialMediaSelect from "../SocialMediaSelect";
import NicheSelect from "./NicheSelect";
import GenderForm from "./GenderForm";
import ConfirmForm from "./ConfirmForm";

interface CreatorForm {
  userID: string;
  userName: string;
  gender: string;
  location: string;
  preferences: string[];
  niche: string[];
}

const creatorFormData: CreatorForm = {
  //TODO: grab userID after initial user signup page
  userID: "",
  userName: "",
  gender: "",
  location: "",
  preferences: [],
  niche: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<CreatorForm>(creatorFormData);

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
  const handleLocationChange = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location: location,
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

  const steps = [
    <UsernameForm
      key="userName"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
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
      handleNextStep={handleNextStep}
    />,
    <ToDashboard key="ToDashboard" handleNextStep={handleNextStep} />,
  ];

  return (
    <div className="border border-gray-300 rounded-md mx-auto max-w-3xl p-7">
      <form action="" className="min-h-[32rem] flex flex-col">
        {/* Back Button */}
        <div className="flex">
          {step !== 0 && (
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
    </div>
  );
};

export default SignUpBox;
