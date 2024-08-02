'use client'

import { updateUserSelf } from "@/actions/userApi";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";

export default function NotificationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const emailSettings = useAppSelector((state) => ({
    communicationEmail: state.profileDataReducer.value.communicationEmail,
    marketingEmail: state.profileDataReducer.value.marketingEmail,
    messageEmail: state.profileDataReducer.value.messageEmail,
    securityEmail: state.profileDataReducer.value.securityEmail,
  }));

  const [localEmail, setLocalEmail] = useState(emailSettings);

  const session = useSession();
  const userId = session.data?.user.id;

  const handleChange = (key: keyof typeof emailSettings) => (event: ChangeEvent<HTMLInputElement>) => {
    setLocalEmail({ ...localEmail, [key]: event.target.checked });
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }
      const response = await updateUserSelf(userId, localEmail);
      console.log("Email settings updated:", response.data);
      dispatch(profileDataInfo(localEmail));
    } catch (error) {
      console.error("Failed to update user settings:", error);
    }
  };


  return (
    <>
      <h1 className="heading1 ts5-text">Notification Settings</h1>
      <section className="flex flex-col border border-gray-300 rounded-badge p-10 h-[31.875rem]">
        <div className="mr-auto heading2 ts7-text">Email Notifications</div>
        <div className="flex flex-col mt-10 gap-10">
          <div className="flex justify-between">
            <div>
              <h1 className="body2 ts7-text mb-[.2rem]">
                Communication emails{" "}
              </h1>
              <p className="body1 g5-text">
                Receive emails about your account activity.
              </p>
            </div>
            <Switch
              checked={localEmail.communicationEmail}
              onChange={handleChange("communicationEmail")}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="body2 ts7-text mb-[.2rem]">Marketing emails </h1>
              <p className="body1 g5-text">
                Receive emails about new products, features, and more from
                ShareFluence.
              </p>
            </div>
            <Switch
              checked={localEmail.marketingEmail}
              onChange={handleChange("marketingEmail")}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="body2 ts7-text mb-[.2rem]">Message emails </h1>
              <p className="body1 g5-text">
                Receive emails when you receive messages.
              </p>
            </div>
            <Switch
              checked={localEmail.messageEmail}
              onChange={handleChange("messageEmail")}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="body2 ts7-text mb-[.2rem]">Security emails </h1>
              <p className="body1 g5-text">
                Receive emails about your account security.
              </p>
            </div>
            <Switch
              checked={localEmail.securityEmail}
              onChange={handleChange("securityEmail")}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <button className="primary-btn mr-auto mt-auto" onClick={handleSubmit}>
          Update
        </button>
      </section>
    </>
  );
}
