"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-muted-foreground">
      <span>
        <span className="text-green-500 select-none">$ </span>
        {command}
      </span>
      <button
        onClick={handleCopy}
        className="ml-4 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}
