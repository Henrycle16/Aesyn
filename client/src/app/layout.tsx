import "../styles/globals.css";
import { Inter } from "next/font/google";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Welcome to "Startup....."',
  description: 'Landing page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (  
      <html lang="en">
        <body className={inter.className}>
        <HeaderComponent />
          {children}
          <Footer />
        </body>
      </html>
  );
}
