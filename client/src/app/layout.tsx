import "../styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";

// Next-Auth
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/utils/SessionProvider";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Welcome to "Startup....."',
  description: "App",
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
        <ReduxProvider>
          <SessionProvider session={session}>
            <div className="flex flex-col min-h-screen">{children}</div>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
