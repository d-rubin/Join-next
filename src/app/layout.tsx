import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Join",
  description: "The task management apps",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="min-w-full min-h-screen">
      <body className={`${inter.className} min-w-full min-h-screen bg-defaultColor max-w-screen-lg mx-auto`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
