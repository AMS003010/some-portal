import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Publication Portal",
  description: "Publication portal for PES EC Campus Faculty",
};

export default function RootLayout({children}:RootLayoutProps){
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content="PES EC Publication, Teachers Publiaction"/>
      </head>
      <body>
          {children}
      </body>
    </html>
  );
}