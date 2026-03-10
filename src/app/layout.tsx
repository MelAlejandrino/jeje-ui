import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "jeje/ui",
  description:
    "A collection of reusable components built on top of shadcn/ui. Copy-paste ready, accessible, and customizable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} dark antialiased`}>
      <body>{children}</body>
    </html>
  );
}
