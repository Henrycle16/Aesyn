"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import SocialMediaSelect from "./SocialMediaSelect";
import ConfirmForm from "./ConfirmForm";
import ToDashboard from "../ToDashboard";

/* 
  This is the parent component
  This component will control and manage steps and data 
*/

// Step 1: Company Form Info
// Step 2: Contact Form Info
// Step 3: Social Media Selector Info
// Step 4: Confirm Form Data
// Step 5: Redirect to dashboard
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
  const [step, setStep] = useState('1');
  const [formData, setFormData] = useState(brandFormData);

  // Method to go to NEXT step
  const handleNextStep = () => {
    if (step === '1') setStep('2');
    else if (step === '2') setStep('3');
    else if (step === '3') setStep('4');
    else if (step === '4') setStep('5');
    else if (step === '5') setStep('6');
  }
  
  // Method to go to PREVIOUS step
  const handlePrevStep = () => {
    if (step === '5') setStep('4');
    else if (step === '4') setStep('3');
    else if (step === '3') setStep('2');
    else if (step === '2') setStep('1');
  }

  // Method to update FormData
  const handleFormChange = (event: any) => {
    const fieldName = event?.target.name;

    setFormData({
      ...formData,
      [fieldName]: event?.target.value,
    });
  };

  const handlePreferenceChange = (selected: string) => {
    if (formData.preferences.includes(selected)) {
      setFormData({
        ...formData,
        ['preferences']: [...formData.preferences.filter((preference) => preference !== selected)],
      });
      return;
    }
    setFormData({
      ...formData,
      ['preferences']: [...formData.preferences, selected],
    });
  };

  //TODO: Method to submit form
  const handleSubmitForm = () => {
    return;
  }


  return (
    <div className="flex justify-center items-center h-auto pt-52">
      <Box
        className="p-5 bg-base-200 rounded-box"
        sx={{ width: "900px", height: "600px", border: "1px solid black" }}
      >
        {/* Render Form Parts Here */}
        {
          step === '1' && <CompanyForm 
            formData={formData}
            handleFormChange={handleFormChange}
            handleNextStep={handleNextStep}
          />
        }
        {
          step === '2' && <ContactForm 
            formData={formData}
            handleFormChange={handleFormChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        }
        {
          step === '3' && <SocialMediaSelect 
            formData={formData}
            handlePreferenceChange={handlePreferenceChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        }
        {
          step === '4' && <ConfirmForm 
            formData={formData}
            handleFormChange={handleFormChange}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        }
         {
          step === '5' && <ToDashboard 
            handleNextStep={handleNextStep}
          />
        }
      </Box>
    </div>
  );
};

export default SignUpBox;
