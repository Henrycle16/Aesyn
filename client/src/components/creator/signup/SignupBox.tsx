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
import ToDashboard from "../../ui/ToDashboard";
import LocationBox from "../../ui/mapbox/LocationBox";
import SocialMediaSelect from "../../ui/SocialMediaSelect";
import NicheSelect from "./NicheSelect";
import GenderForm from "./GenderForm";
import ConfirmForm from "./ConfirmForm";
import ProgressBar from "@/components/ui/ProgressBar";
import { creatorSignUp } from "./../../../actions/creator";

import { creatorInfo } from "@/redux/slices/creator-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

type Inputs = z.infer<typeof FormDataSchema>;

interface CreatorForm {
  user: object;
  gender: string;
  location: string;
  preferences: string[];
  niche: string[];
}

const creatorFormData: CreatorForm = {
  user: {},
  gender: "",
  location: "",
  preferences: [],
  niche: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<CreatorForm>(creatorFormData);
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

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  // Method to handle the next step
  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  // Method to handle the prev step
  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const onBack = () => {
    const dispatch = useDispatch<AppDispatch>();
    let currentStep = useAppSelector((state) => state.creatorInfoReducer.value.currentStep);

    dispatch(creatorInfo({ currentStep: currentStep - 1 }));
  }

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

    const dispatch = useDispatch<AppDispatch>();
    let currentStep = useAppSelector((state) => state.creatorInfoReducer.value.currentStep);

    dispatch(creatorInfo({ currentStep: currentStep + 1 }));

    // Split the location string and create the location object
    const [city, state, country] = formData.location.split(",");
    const location = { city, state, country };

    // Create the location object and encapsulate it with the form data
    const { user, gender, niche, preferences } = formData;
    const body = JSON.stringify({
      user,
      userName: getValues("userName"),
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
      handleNextStep={handleNextStep}
      register={register}
      errors={errors}
      getValues={getValues}
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
              back
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
