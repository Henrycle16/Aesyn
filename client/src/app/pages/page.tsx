// pages/index.tsx
"use client";
import { MouseEvent } from "react";
import Link from "next/link";

export default function Home() {
  const handleLoginClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=212488478592886&redirect_uri=https://www.google.com/&scope=user_profile,user_media&response_type=code`;
  };

  return (
    <div>
      <h1>Next.js Instagram OAuth Example</h1>
      <button onClick={handleLoginClick}>Login with Instagram</button>
    </div>
  );
}
