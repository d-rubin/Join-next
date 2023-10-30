import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Join", template: "%s | Join" },
  description: "The task management apps",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="min-w-full min-h-screen">
      <body className={`${inter.className} min-h-screen min-w-screen bg-defaultColor`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
