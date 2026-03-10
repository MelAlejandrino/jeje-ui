"use client";

import { useState } from "react";
import { CopyCommand } from "@/components/copy-command";
import VirtualizedDropdown from "@/registry/new-york/virtualized-dropdown/virtualized-dropdown";

const sampleData = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Option ${i + 1}`,
}));

const countries = [
  { id: 1, name: "Philippines" },
  { id: 2, name: "United States" },
  { id: 3, name: "Japan" },
  { id: 4, name: "South Korea" },
  { id: 5, name: "Germany" },
  { id: 6, name: "France" },
  { id: 7, name: "Australia" },
  { id: 8, name: "Canada" },
];

export default function VirtualizedDropdownPage() {
  const [single, setSingle] = useState<{ id: number; name: string } | null>(
    null,
  );
  const [multi, setMulti] = useState<{ id: number; name: string }[]>([]);
  const [large, setLarge] = useState<{ id: number; name: string } | null>(null);

  return (
    <div className="max-w-2xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Virtualized Dropdown
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          A performant dropdown built with{" "}
          <a
            href="https://tanstack.com/virtual"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            TanStack Virtual
          </a>
          . Handles tens of thousands of options without performance
          degradation. Supports single and multi-select, custom label keys, and
          client-side search.
        </p>
      </div>

      {/* Single select preview */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Single Select
        </h2>
        <VirtualizedDropdown
          data={countries}
          label="Select a country..."
          single
          value={single}
          onChange={(val) => setSingle(val as { id: number; name: string })}
        />
      </div>

      {/* Multi select preview */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Multi Select
        </h2>
        <VirtualizedDropdown
          data={countries}
          label="Select countries..."
          value={multi}
          onChange={(val) => setMulti(val as { id: number; name: string }[])}
          keepOpenOnSelect
        />
      </div>

      {/* Large dataset preview */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Large Dataset (10,000 options)
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Renders instantly regardless of dataset size thanks to virtualization.
        </p>
        <VirtualizedDropdown
          data={sampleData}
          label="Select from 10,000 options..."
          single
          value={large}
          onChange={(val) => setLarge(val as { id: number; name: string })}
        />
      </div>

      {/* Installation */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Installation
        </h2>
        <CopyCommand command="npx shadcn@latest add https://jeje-ui.vercel.app/r/virtualized-dropdown.json" />
      </div>

      {/* Usage */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Usage</h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-muted-foreground">
          {`import VirtualizedDropdown from "@/components/ui/virtualized-dropdown";

const data = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
];

// Single select
<VirtualizedDropdown
  data={data}
  label="Select..."
  single
  value={selected}
  onChange={(val) => setSelected(val)}
/>

// Multi select
<VirtualizedDropdown
  data={data}
  label="Select multiple..."
  value={selected}
  onChange={(val) => setSelected(val)}
  keepOpenOnSelect
/>

// Custom label key
<VirtualizedDropdown
  data={users}
  nameSet="email"
  idSet="uuid"
  label="Select a user..."
  single
  value={selected}
  onChange={(val) => setSelected(val)}
/>

// Concatenated label keys
<VirtualizedDropdown
  data={users}
  nameSet="firstName + lastName"
  label="Select a user..."
  single
  value={selected}
  onChange={(val) => setSelected(val)}
/>`}
        </pre>
      </div>

      {/* Props */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Props</h2>
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
                  prop: "data",
                  type: "T[]",
                  default: "—",
                  desc: "Array of options to display",
                },
                {
                  prop: "label",
                  type: "string",
                  default: '"Select..."',
                  desc: "Placeholder text when nothing is selected",
                },
                {
                  prop: "single",
                  type: "boolean",
                  default: "false",
                  desc: "Enable single select mode",
                },
                {
                  prop: "value",
                  type: "T | T[] | null",
                  default: "—",
                  desc: "Controlled selected value",
                },
                {
                  prop: "onChange",
                  type: "function",
                  default: "—",
                  desc: "Called when selection changes",
                },
                {
                  prop: "disabled",
                  type: "boolean",
                  default: "false",
                  desc: "Disables the dropdown",
                },
                {
                  prop: "keepOpenOnSelect",
                  type: "boolean",
                  default: "false",
                  desc: "Keep dropdown open after selecting",
                },
                {
                  prop: "nameSet",
                  type: "string | function",
                  default: '"name"',
                  desc: 'Key to use as display label. Supports dot paths, "a + b" concatenation, or a custom function',
                },
                {
                  prop: "idSet",
                  type: "string | function",
                  default: '"id"',
                  desc: "Key to use as unique identifier, or a custom function",
                },
                {
                  prop: "customEmptyMessage",
                  type: "string",
                  default: "—",
                  desc: "Override the empty state message entirely",
                },
                {
                  prop: "classname",
                  type: "string",
                  default: "—",
                  desc: "Additional classes for the trigger button",
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
    </div>
  );
}
