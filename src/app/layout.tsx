import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";

const jetBrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono[wght].woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Italic[wght].woff2",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Öznur Karahasan | AI Portfolio",
  description: "Senior Frontend Developer & Cloud Architect Portfolio powered by Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
