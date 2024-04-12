import "../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import React from "react";
import Header from "@/components/header";

// Next-Auth
import { getServerSession } from 'next-auth'
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Welcome to "Startup....."',
  description: 'App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
