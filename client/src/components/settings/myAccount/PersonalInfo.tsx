"use clients"

import { useState } from "react";
import Button from "@mui/material/Button";

export default function PersonalInfo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <section className="border border-gray-300 rounded-badge min-h-[28rem] grid grid-rows-[12.75rem,1fr] grid-cols-2 mb-5">
      <div className="col-span-1 p-8">
        <h2 className="subheader2 ts5-text pb-4"> Personal Information </h2>
        <h2 className="body2 ts5-text"> Name </h2>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <h2 className="body2 ts5-text"> Username </h2>
          <div className="relative">
            <input
              className="input-md w-full input-focus-primary"
              type="text"
              id="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              name="username"
              autoFocus
              required
            />
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <h2 className="body2 ts5-text"> Contact email </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              
              <input
                className="input-md w-full input-focus-primary"
                type="email"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                name="email"
                autoFocus
                required
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
          <h2 className="body2 ts5-text"> Location </h2>
          <div className="relative">
            <div className="flex flex-row items-center justify-between">
              
              <input
                className="input-md w-full input-focus-primary"
                type="text"
                id="location"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                name="location"
                autoFocus
                required
              />
            </div>
            <p className="mt-1 text-sm min-h-5 ts8-text">{}</p>
          </div>
        </form>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-3 mb-2 ts1-bg"
        >
          Save
        </Button>
      </div>
    </section>
  );
}
