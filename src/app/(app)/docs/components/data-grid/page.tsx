import {Metadata} from "next";
import DataGridPage from "@/features/data-grid/page";

export const metadata: Metadata = {
    title: "Data Grid",
    description:
        "A powerful table component with inline row creation, editing, and deletion built on top of TanStack Table.",
    openGraph: {
        title: "Data Grid — jeje/ui",
        description:
            "A powerful table component with inline row creation, editing, and deletion built on top of TanStack Table.",
        url: "https://jeje-ui.vercel.app/docs/components/data-grid",
    },
};

export default function Page() {
    return (
        <div className="max-w-7xl space-y-10">
            <DataGridPage/>
        </div>
    );
}
