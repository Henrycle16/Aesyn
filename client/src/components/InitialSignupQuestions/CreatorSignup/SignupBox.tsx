"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
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
  const [username, setUsername] = useState("");
  const [isUsernameValid, setUsernameValid] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);

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
    setUsername(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Method to handle the Gender change event
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gender: event.target.value });
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

  const steps = [
    <UsernameForm
      key="userName"
      formData={formData}
      username={username}
      isUsernameValid={isUsernameValid}
      isNextButtonDisabled={isNextButtonDisabled}
      setUsernameValid={setUsernameValid}
      setNextButtonDisabled={setNextButtonDisabled}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
    />,
    <GenderForm
      key="GenderForm"
      formData={formData}
      handleGenderChange={handleGenderChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <LocationBox
      key="LocationBox"
      formData={formData}
      handleLocationChange={handleLocationChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <NicheSelect
      key="NicheSelect"
      formData={formData}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
    />,
    <ToDashboard key="ToDashboard" />,
  ];

  return (
    <div className="flex justify-center items-center h-auto pt-52">
      <Box
        className="p-5 bg-base-200 rounded-box"
        sx={{ width: "900px", height: "600px", border: "1px solid black" }}
      >
        {/* Render Form Parts Here */}
        {steps[step]}
      </Box>
    </div>
  );
};

export default SignUpBox;
