import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import React from "react";

// Next-Auth
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/utils/SessionProvider";
import { ReduxProvider } from "@/redux/provider";

const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={montserrat.className}>
        <ReduxProvider>
          <SessionProvider session={session}>
            <div className="flex flex-col min-h-screen">{children}</div>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
