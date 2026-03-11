import type {Metadata} from "next";
import {DocsPageView} from "@/features/docs/page";

export const metadata: Metadata = {
    title: "Introduction",
    description:
        "Practical, copy-paste React components built on top of shadcn/ui. Designed for dashboards, admin panels, and internal tools — but flexible enough for any project.",
    openGraph: {
        title: "Introduction — jeje/ui",
        description:
            "Practical, copy-paste React components built on top of shadcn/ui. Designed for dashboards, admin panels, and internal tools — but flexible enough for any project.",
        url: "https://jeje-ui.vercel.app/docs",
    },
};

export default function DocsPage() {
    return (
        <div className="max-w-2xl">
            <DocsPageView/>
        </div>
    );
}