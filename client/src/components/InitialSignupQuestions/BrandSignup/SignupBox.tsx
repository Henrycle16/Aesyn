"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/brandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import SocialMediaSelect from "../SocialMediaSelect";
import ConfirmForm from "./ConfirmForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";
import ProgressBar from "@/components/ProgressBar";
import { brandSignUp } from "./../../../actions/brand";

type Inputs = z.infer<typeof FormDataSchema>;

interface BrandForm {
  user: object;
  industry: string;
  location: string;
  preferences: string[];
}

const brandFormData: BrandForm = {
  user: {},
  industry: "",
  location: "",
  preferences: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(20);
  const [formData, setFormData] = useState<BrandForm>(brandFormData);
  const [lng, setLng] = useState<number>(-98.5795);
  const [lat, setLat] = useState<number>(39.8283);
  const [zoom, setZoom] = useState<number>(2.5);
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

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange'
  });

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
    const {
      user,
      industry,
      preferences,
    } = formData;
    const body = JSON.stringify({
      user,
      companyName: getValues("companyName"),
      industry,
      contactPersonName: `${getValues("firstName")} ${getValues("lastName")}`,
      contactPhoneNumber: getValues("contactPhoneNumber"),
      preferences,
      location,
    });

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
      register={register}
      errors={errors}
      getValues={getValues}
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
    <ContactForm
      key="ContactForm"
      handleNextStep={handleNextStep}
      register={register}
      errors={errors}
      getValues={getValues}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
    />,
    <ConfirmForm key="ConfirmForm" formData={formData} getValues={getValues} />,
    <ToDashboard key="ToDashboard" />,
  ];

  useEffect(() => {
    if (step == steps.length - 1) return;
    const totalSteps = steps.length - 1;
    const val = ((step + 1) / totalSteps) * 100;
    setProgress(val);
  }, [step, steps.length]);

  const borderStyle = step !== steps.length - 1 ? "border-b-0 " : "rounded-b-md ";

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className={borderStyle + "min-h-[32rem] flex flex-col p-7 border border-gray-300 rounded-t-md"}
      >
        {/* Back Button */}
        <div className="flex">
          {step !== 0 && step !== steps.length - 1 && (
            <Button
              onClick={handlePrevStep}
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ padding: "12px 24px" }}
            >
              Back
            </Button>
          )}
        </div>

        {/* Render Form Parts Here */}
        <div className="flex-1 flex justify-center">{steps[step]}</div>
      </form>

      {/* Progress Bar */}
      {step !== steps.length - 1 && <ProgressBar progress={progress} />}
    </div>
  );
};

export default SignUpBox;
