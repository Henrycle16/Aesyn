"use client";

import { useState } from "react";
import WaitlistForm from "./_components/WaitlistForm";
import JoinedWaitlistModal from "./_components/JoinedWaitlistModal";

export default function Page() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <div>
      {!isFormSubmitted ? (
        <WaitlistForm setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <JoinedWaitlistModal />
      )}
    </div>
  );
}
