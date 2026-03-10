import { VirtualizedDropdownPageView } from "@/features/virtualized-dropdown/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtualized Dropdown — jeje/ui",
  description:
    "A performant dropdown with TanStack Virtual. Handles tens of thousands of options without performance degradation. Supports single and multi-select.",
  openGraph: {
    title: "Virtualized Dropdown — jeje/ui",
    description:
      "A performant dropdown built with TanStack Virtual for large datasets.",
    url: "https://jeje-ui.vercel.app/docs/components/virtualized-dropdown",
  },
};
export default function VirtualizedDropdownPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <VirtualizedDropdownPageView />
    </div>
  );
}
