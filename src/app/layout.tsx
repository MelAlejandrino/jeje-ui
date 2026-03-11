import type {Metadata} from "next";
import {JetBrains_Mono} from "next/font/google";
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
        "Practical, copy-paste React components built on top of shadcn/ui. Designed for dashboards, admin panels, and internal tools — but flexible enough for any project.",
    metadataBase: new URL("https://jeje-ui.vercel.app"),
    openGraph: {
        title: "jeje/ui",
        description:
            "Practical, copy-paste React components built on top of shadcn/ui. Designed for dashboards, admin panels, and internal tools — but flexible enough for any project.",
        siteName: "jeje/ui",
        url: "https://jeje-ui.vercel.app",
        type: "website",
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
