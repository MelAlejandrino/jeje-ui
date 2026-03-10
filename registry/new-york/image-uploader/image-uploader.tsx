import { Trash2Icon, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState, useRef, useEffect } from "react";

type ImageValue = File | string;

interface ImageUploaderProps {
  multiple?: boolean;
  value?: ImageValue | ImageValue[] | null;
  onChange?: (value: ImageValue | ImageValue[] | null) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function ImageUploader({
  multiple = true,
  value,
  onChange,
  onError,
  maxFiles = 10,
  maxFileSize = 10,
  onSuccess,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<ImageValue[]>(() =>
    value ? (Array.isArray(value) ? value : [value]) : [],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync parent value if it changes externally
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!value) return setFiles([]);
    const arr = Array.isArray(value) ? value : [value];
    setFiles(arr);
  }, [value]);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const newFiles: ImageValue[] = [];
    let errorMessage: string | null = null;

    Array.from(e.target.files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errorMessage = `"${file.name}" is not allowed. Only JPEG, PNG, or WEBP are accepted.`;
        return;
      }
      if (file.size > maxFileSize * 1024 * 1024) {
        errorMessage = `"${file.name}" exceeds ${maxFileSize}MB`;
        return;
      }
      newFiles.push(file);
    });

    // If ALL files were rejected, report error and bail out early
    // without calling onChange — so RHF doesn't re-validate and wipe setError
    if (errorMessage && newFiles.length === 0) {
      onError?.(errorMessage);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    let updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles];

    if (updatedFiles.length > maxFiles) {
      errorMessage = `You can upload up to ${maxFiles} files`;
      updatedFiles = updatedFiles.slice(0, maxFiles);
    }

    setFiles(updatedFiles);
    onChange?.(multiple ? updatedFiles : (updatedFiles[0] ?? null));

    if (errorMessage) {
      onError?.(errorMessage);
    } else {
      onSuccess?.();
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    onChange?.(multiple ? updated : (updated[0] ?? null));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Upload area */}
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6 text-center hover:bg-gray-100">
        <div className={"rounded-sm border p-3"}>
          <Upload className="h-6 w-6" />
        </div>
        <p className="font-medium">
          {multiple
            ? `Drag and drop files or browse`
            : `Drag and drop file or browse`}
        </p>
        <p className="text-sm text-gray-500">
          JPEG, PNG, WEBP - Max {maxFileSize}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          className="hidden"
          onChange={handleFilesChange}
        />
      </label>

      {/* Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {files.map((file, i) => {
            const url =
              typeof file === "string" ? file : URL.createObjectURL(file);
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-md shadow-md"
              >
                <img src={url} className="h-32 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 rounded-full bg-white/80 p-1 hover:bg-white"
                >
                  <Trash2Icon className="h-4 w-4 text-red-600" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
