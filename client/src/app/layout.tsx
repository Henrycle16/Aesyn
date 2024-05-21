import "../styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Welcome to "Startup....."',
  description: "App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
