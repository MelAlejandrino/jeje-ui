import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "jeje/ui",
    template: "%s — jeje/ui",
  },
  description:
    "A collection of reusable components built on top of shadcn/ui. Copy-paste ready, accessible, and customizable.",
  metadataBase: new URL("https://jeje-ui.vercel.app"),
  openGraph: {
    siteName: "jeje/ui",
    url: "https://jeje-ui.vercel.app",
  },
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
