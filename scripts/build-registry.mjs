import fs from "fs";
import path from "path";

const items = [
  {
    name: "image-uploader",
    type: "registry:component",
    title: "Image Uploader",
    description: "Drag-and-drop image uploader with preview and validation.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "components/ui/image-uploader.tsx",
        type: "registry:component",
        source: "registry/new-york/image-uploader/image-uploader.tsx", 
      },
    ],
  },
];

fs.mkdirSync("public/r", { recursive: true });

for (const item of items) {
  const files = item.files.map(({ source, ...rest }) => ({
    ...rest,
    content: fs.readFileSync(source, "utf-8"),
  }));

  const output = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  };

  const outPath = path.join("public/r", `${item.name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`built ${outPath}`);
}
