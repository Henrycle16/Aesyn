import "../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import React from "react";
import Header from "@/components/Header";

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
          <Header />
          <main className="container flex-1 mx-auto flex items-center max-lg:py-5">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
