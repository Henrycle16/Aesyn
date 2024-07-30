'use client'

import Switch from "@mui/material/Switch";
import React, { ChangeEvent, useState } from "react";

export default function NotificationPage() {
  const [checked, setChecked] = useState(true);





  function handleChange(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    throw new Error("Function not implemented.");
  }

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
              checked={checked}
              onChange={handleChange}
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
              checked={checked}
              onChange={handleChange}
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
              checked={checked}
              onChange={handleChange}
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
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <button type="submit" className="primary-btn mr-auto mt-auto">
          Update
        </button>
      </section>
    </>
  );
}
