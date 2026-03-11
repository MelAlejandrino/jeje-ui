import type {Metadata} from "next";
import {DocsPageView} from "@/features/docs/page";

export const metadata: Metadata = {
    title: "Introduction",
    description:
        "jeje/ui is a collection of reusable components built on top of shadcn/ui. Copy-paste ready, accessible, and customizable.",
    openGraph: {
        title: "Introduction — jeje/ui",
        description:
            "jeje/ui is a collection of reusable components built on top of shadcn/ui. Copy-paste ready, accessible, and customizable.",
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