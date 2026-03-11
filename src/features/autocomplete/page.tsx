"use client";

import {useState} from "react";
import {CopyCommand} from "@/components/copy-command";
import {AutoComplete, type Option} from "@/registry/new-york/autocomplete/autocomplete";
import {frameworks, countries} from "@/features/autocomplete/constant";

export default function AutoCompletePageView() {
    const [basic, setBasic] = useState<Option | null>(null);
    const [freeForm, setFreeForm] = useState<Option | null>(null);
    const [openOnFocus, setOpenOnFocus] = useState<Option | null>(null);
    const [loading, setLoading] = useState<Option | null>(null);
    const [disabled, setDisabled] = useState<Option | null>({
        value: "next",
        label: "Next.js",
    });
    const [isLoading, setIsLoading] = useState(false);

    const simulateLoading = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="max-w-2xl space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Autocomplete
                </h1>
                <p className="mt-3 text-muted-foreground leading-7">
                    A combobox-style autocomplete input that filters options as you type.
                    Supports free-form input, loading state, keyboard navigation, and
                    outside click dismissal.
                </p>
            </div>

            {/* Basic */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Basic</h2>
                <p className="text-sm text-muted-foreground mb-3">
                    Filters options as you type. Press Enter or click to select.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                    <AutoComplete
                        options={frameworks}
                        placeholder="Search frameworks..."
                        value={basic}
                        onValueChange={setBasic}
                        onClear={() => setBasic(null)}
                    />
                    {basic && (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Selected: <span className="text-foreground">{basic.label}</span> (value: <span
                            className="text-foreground">{basic.value}</span>)
                        </p>
                    )}
                </div>
            </div>

            {/* Free-form input */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                    Free-form Input
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                    Type anything and press Enter — if it doesn&#39;t match an option, it
                    uses your input as the value directly.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                    <AutoComplete
                        options={countries}
                        placeholder="Search or type anything..."
                        value={freeForm}
                        onValueChange={setFreeForm}
                        onClear={() => setFreeForm(null)}
                    />
                    {freeForm && (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Value: <span className="text-foreground">{freeForm.value}</span>
                            {!countries.find(c => c.value === freeForm.value) && (
                                <span className="ml-2 text-yellow-500">(custom input)</span>
                            )}
                        </p>
                    )}
                </div>
            </div>

            {/* Open on Focus */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                    Open on Focus
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                    Shows options immediately when the input is focused, before typing.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                    <AutoComplete
                        options={frameworks}
                        placeholder="Click to see options..."
                        value={openOnFocus}
                        onValueChange={setOpenOnFocus}
                        onClear={() => setOpenOnFocus(null)}
                        openOnFocus
                    />
                </div>
            </div>

            {/* Loading state */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                    Loading State
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                    Shows a skeleton while data is being fetched.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-3">
                    <AutoComplete
                        options={frameworks}
                        placeholder="Search frameworks..."
                        value={loading}
                        onValueChange={setLoading}
                        isLoading={isLoading}
                    />
                    <button
                        onClick={simulateLoading}
                        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        Simulate loading (2s)
                    </button>
                </div>
            </div>

            {/* Disabled */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                    Disabled
                </h2>
                <div className="rounded-lg border border-border bg-muted/30 p-6">
                    <AutoComplete
                        options={frameworks}
                        placeholder="Search frameworks..."
                        value={disabled}
                        onValueChange={setDisabled}
                        disabled
                    />
                </div>
            </div>

            {/* Installation */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                    Installation
                </h2>
                <CopyCommand command="npx shadcn@latest add https://jeje-ui.vercel.app/r/autocomplete.json"/>
            </div>

            {/* Usage */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Usage</h2>
                <pre
                    className="rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-muted-foreground overflow-x-auto">
{`import { AutoComplete, type Option } from "@/components/ui/autocomplete";

const options: Option[] = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
];

<AutoComplete
  options={options}
  placeholder="Search..."
  value={selected}
  onValueChange={setSelected}
  onClear={() => setSelected(null)}
/>

// Open on focus
<AutoComplete
  options={options}
  placeholder="Click to see options..."
  value={selected}
  onValueChange={setSelected}
  openOnFocus
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
                            <th className="px-4 py-2.5 text-left font-medium">Description</th>
                        </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                        {[
                            {prop: "options", type: "Option[]", default: "—", desc: "Array of options to display"},
                            {prop: "value", type: "Option | null", default: "—", desc: "Controlled selected value"},
                            {
                                prop: "onValueChange",
                                type: "function",
                                default: "—",
                                desc: "Called when selection changes"
                            },
                            {prop: "onClear", type: "function", default: "—", desc: "Called when input is cleared"},
                            {prop: "placeholder", type: "string", default: "—", desc: "Input placeholder text"},
                            {
                                prop: "emptyMessage",
                                type: "string",
                                default: '"No results found."',
                                desc: "Message shown when no options match"
                            },
                            {
                                prop: "isLoading",
                                type: "boolean",
                                default: "false",
                                desc: "Shows skeleton while loading"
                            },
                            {prop: "disabled", type: "boolean", default: "false", desc: "Disables the input"},
                            {
                                prop: "openOnFocus",
                                type: "boolean",
                                default: "false",
                                desc: "Opens the dropdown when the input is focused, before typing"
                            },
                        ].map((row) => (
                            <tr key={row.prop} className="border-b border-border last:border-0">
                                <td className="px-4 py-2.5 font-mono text-foreground">{row.prop}</td>
                                <td className="px-4 py-2.5 font-mono text-blue-400">{row.type}</td>
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