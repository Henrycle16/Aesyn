"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import SocialMediaSelect from "../SocialMediaSelect";
import ConfirmForm from "./ConfirmForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";
import { brandSignUp } from "./../../../actions/brand";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
  user: object;
  companyName: string;
  industry: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  location: string;
  preferences: string[];
}

const brandFormData: BrandForm = {
  user: {},
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
  }, [step]);

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

  // Method to submit form
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Split the location string and create the location object
    const [city, state, country] = formData.location.split(",");
    const location = { city, state, country };

    // Create the location object and encapsulate it with the form data
    const { user, companyName, industry, contactPersonName, contactEmail, contactPhoneNumber, preferences } = formData;
    const body = JSON.stringify({user, companyName, industry, contactPersonName, contactEmail, contactPhoneNumber, preferences, location});

    try {
      const brandSignUpResponse = await brandSignUp(body);

      if (brandSignUpResponse && !brandSignUpResponse.error) {
        console.log("REGISTERED BRAND!");
        handleNextStep();
      }
    } catch {
      console.log("Error!");
    }

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
      handlePrevStep={handlePrevStep}
    />,
    <ContactForm
      key="ContactForm"
      formData={formData}
      handleFormChange={handleFormChange}
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
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handlePrevStep={handlePrevStep}
    />,
    <ToDashboard key="ToDashboard" />,
  ];

  return (
    <div className="flex justify-center items-center h-auto pt-52">
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <Box
          className="p-5 bg-base-200 rounded-box"
          sx={{ width: "900px", height: "600px", border: "1px solid black" }}
        >
          {/* Render Form Parts Here */}
          {steps[step]}
        </Box>
      </form>
    </div>
  );
};

export default SignUpBox;
