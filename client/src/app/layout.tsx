import "../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import React from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Welcome to "Startup....."',
  description: 'App',
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
