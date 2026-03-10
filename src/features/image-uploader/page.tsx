"use client";
import { CopyCommand } from "@/components/copy-command";
import { ImageUploader } from "@/registry/new-york/image-uploader/image-uploader";
import { toast } from "sonner";

export const ImageUploaderPageView = () => {
  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Image Uploader
        </h1>
        <p className="mt-3 text-muted-foreground leading-7">
          A drag-and-drop image uploader with preview and validation. Supports
          multiple files, file size limits, and file type restrictions. Works
          with React Hook Form out of the box.
        </p>
      </div>

      {/* Preview */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Multiple Images Upload Preview
        </h2>
        <ImageUploader
          onSuccess={() => toast.success("File uploaded successfully!")}
          onError={(message) => toast.error(message)}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Single Image Upload Preview
        </h2>
        <ImageUploader
          multiple={false}
          onSuccess={() => toast.success("File uploaded successfully!")}
          onError={(message) => toast.error(message)}
        />
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Installation
        </h2>
        <CopyCommand command="npx shadcn@latest add https://jeje-ui.vercel.app/r/image-uploader.json" />
      </div>

      {/* Usage */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Usage</h2>
        <pre className="rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-muted-foreground overflow-x-auto">
          {`import { ImageUploader } from "@/components/ui/image-uploader";

// Multiple files
<ImageUploader
  multiple={true}
  maxFiles={5}
  maxFileSize={10}
  onChange={(files) => console.log(files)}
  onError={(msg) => console.error(msg)}
/>

// Single file
<ImageUploader
  multiple={false}
  maxFileSize={5}
  onChange={(file) => console.log(file)}
  onError={(msg) => console.error(msg)}
/>`}
        </pre>
      </div>

      {/* Props */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Props</h2>
        <div className="overflow-hidden rounded-lg border border-border text-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted text-muted-foreground">
                <th className="px-4 py-2.5 text-left font-medium">Prop</th>
                <th className="px-4 py-2.5 text-left font-medium">Type</th>
                <th className="px-4 py-2.5 text-left font-medium">Default</th>
                <th className="px-4 py-2.5 text-left font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                {
                  prop: "multiple",
                  type: "boolean",
                  default: "true",
                  desc: "Allow multiple file uploads",
                },
                {
                  prop: "value",
                  type: "File | string | (File | string)[]",
                  default: "—",
                  desc: "Controlled value",
                },
                {
                  prop: "onChange",
                  type: "function",
                  default: "—",
                  desc: "Called when files change",
                },
                {
                  prop: "maxFiles",
                  type: "number",
                  default: "10",
                  desc: "Maximum number of files",
                },
                {
                  prop: "maxFileSize",
                  type: "number",
                  default: "10",
                  desc: "Max file size in MB",
                },
                {
                  prop: "onError",
                  type: "function",
                  default: "—",
                  desc: "Called when validation fails",
                },
                {
                  prop: "onSuccess",
                  type: "function",
                  default: "—",
                  desc: "Called after each successful file addition",
                },
              ].map((row) => (
                <tr
                  key={row.prop}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2.5 font-mono text-foreground">
                    {row.prop}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-blue-400">
                    {row.type}
                  </td>
                  <td className="px-4 py-2.5 font-mono">{row.default}</td>
                  <td className="px-4 py-2.5">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
