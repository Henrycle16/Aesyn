"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import SocialMediaSelect from "./SocialMediaSelect";

const SignUpBox = () => {
  const [currentForm, setCurrentForm] = useState("company");
  const [brandInfo, setBrandInfo] = useState({});
  

  const goToNextForm = () => {
    if (currentForm === "company") {
      setCurrentForm("contact");
    }
    if (currentForm === "contact") {
      setCurrentForm("socialmedia");
    }
  };

  const goToPreviousForm = () => {
    if (currentForm === "socialmedia") {
      setCurrentForm("contact");
    }
    if (currentForm === "contact") {
      setCurrentForm("company");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto pt-52">
      <Box
        className="p-5 bg-base-200 rounded-box"
        sx={{ width: "900px", height: "600px", border: "1px solid black" }}
      >
        {currentForm === "company" && <CompanyForm onNext={goToNextForm} brandInfo={brandInfo}  />}
        {currentForm === "contact" && <ContactForm onBack={goToPreviousForm} onNext={goToNextForm}  onSave={setContactInfo} contactInfo={contactInfo}/>}
        {currentForm === "socialmedia" && <SocialMediaSelect onBack={goToPreviousForm} onSave={setSocialMediaInfo} socialMediaInfo={socialMediaInfo}/>}
      </Box>
    </div>
  );
};

export default SignUpBox;
