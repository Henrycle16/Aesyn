import "../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import React from "react";
import Header from "@/components/Header";

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
        <Header />
          {children}
          <Footer />
        </body>
      </html>
  );
}
