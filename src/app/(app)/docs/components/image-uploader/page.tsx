import { ImageUploaderPageView } from "@/features/image-uploader/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Uploader — jeje/ui",
  description:
    "A drag-and-drop image uploader with preview and validation. Supports multiple files, file size limits, and file type restrictions.",
  openGraph: {
    title: "Image Uploader — jeje/ui",
    description: "A drag-and-drop image uploader with preview and validation.",
    url: "https://jeje-ui.vercel.app/docs/components/image-uploader",
  },
};

export default function ImageUploaderPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <ImageUploaderPageView />
    </div>
  );
}
