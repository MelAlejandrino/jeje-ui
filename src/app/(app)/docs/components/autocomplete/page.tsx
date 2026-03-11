import {Metadata} from "next";
import AutoCompletePageView from "@/features/autocomplete/page";

export const metadata: Metadata = {
    title: "Autocomplete",
    description:
        "A combobox-style autocomplete input that filters options as you type. Supports free-form input, loading state, keyboard navigation, and outside click dismissal.",
    openGraph: {
        title: "Autocomplete — jeje/ui",
        description:
            "A combobox-style autocomplete input that filters options as you type. Supports free-form input, loading state, keyboard navigation, and outside click dismissal.",
        url: "https://jeje-ui.vercel.app/docs/components/autocomplete",
    },
};

export default function AutoCompletePage() {
    return (
        <div className="max-w-2xl space-y-10">
            <AutoCompletePageView/>
        </div>
    );
}
