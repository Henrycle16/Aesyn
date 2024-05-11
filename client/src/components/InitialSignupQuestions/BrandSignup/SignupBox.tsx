"use client";

import { useState } from "react";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import SocialMediaSelect from "../SocialMediaSelect";
import ConfirmForm from "./ConfirmForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";

/* 
  This is the parent component
  This component will control and manage steps and data 
*/

// Step 1: Company Form Info
// Step 2: Location Info
// Step 3: Contact Form Info
// Step 4: Social Media Selector Info
// Step 5: Confirm Form Data
// Step 6: Redirect to dashboard
interface BrandForm {
  userID: string;
  companyName: string;
  industry: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  location: string;
  preferences: string[];
}

const brandFormData: BrandForm = {
  //TODO: grab userID after initial user signup page
  userID: "",
  companyName: "",
  industry: "",
  contactPersonName: "",
  contactEmail: "",
  contactPhoneNumber: "",
  location: "",
  preferences: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<BrandForm>(brandFormData);

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

  //TODO: Method to submit form
  const handleSubmitForm = () => {
    return;
  };

  // Steps through rendering the form
  const steps = [
    <CompanyForm
      key="CompanyForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
    />,
    <LocationBox
      key="LocationBox"
      formData={formData}
      handleLocationChange={handleLocationChange}
      handleNextStep={handleNextStep}
      // handlePrevStep={handlePrevStep}
    />,
    <ContactForm
      key="ContactForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
      // handlePrevStep={handlePrevStep}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
      // handlePrevStep={handlePrevStep}
    />,
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
      handleFormChange={handleFormChange}
      // handlePrevStep={handlePrevStep}
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
