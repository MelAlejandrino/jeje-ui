import {Metadata} from "next";
import DataGridPage from "@/features/data-grid/page";

export const metadata: Metadata = {
    title: "Data Grid",
    description:
        "A headless inline CRUD table powered by useTable. Define fields, wire handlers, get a fully functional table with create, edit, delete, validation, and pagination.",
    openGraph: {
        title: "Data Grid — jeje/ui",
        description:
            "A headless inline CRUD table powered by useTable. Define fields, wire handlers, get a fully functional table with create, edit, delete, validation, and pagination.",
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
