import {CopyCommand} from "@/components/copy-command";
import {DataGridDemo} from "@/features/data-grid/demo";
import {
    extraActionsCode,
    getInitialValueCode,
    renderOverrideCode,
    serverPaginationCode,
    sortingCode,
    usageCode,
    validationCode
} from "@/features/data-grid/demo-code";

const dataGridProps = [
    {
        name: "tableProps",
        type: "TableProps<TData>",
        required: true,
        description: "The object returned by spreading useTable. Contains rows, columns, edit state, errors, and all handlers."
    },
    {
        name: "isLoading",
        type: "boolean",
        required: false,
        description: "Shows a loading spinner overlay on the table while fetching."
    },
    {
        name: "customEmptyMessage",
        type: "string",
        required: false,
        description: "Message shown when there are no rows. Defaults to 'No Results.'"
    },
    {
        name: "className",
        type: "string",
        required: false,
        description: "Additional class names applied to the outer wrapper div."
    },
];

const useTableOptions = [
    {
        name: "data",
        type: "TData[]",
        required: true,
        description: "Array of records to display. Each record must have an id field."
    },
    {
        name: "fields",
        type: "FieldsDef<TData>",
        required: true,
        description: "Defines which columns to show, their labels, input types, sizes, and optional custom render functions for read mode."
    },
    {
        name: "validation",
        type: "ValidationFn<TData>",
        required: false,
        description: "Client-side validation per field. Each function receives (value, formData) and returns an error string or null. Runs before onSave and onCreate — throws if any field fails."
    },
    {
        name: "onSave",
        type: "(id, data: Partial<TData>) => Promise<void> | void",
        required: false,
        description: "Called when an edit row is saved. Throw to keep the row open and show backend errors via setError."
    },
    {
        name: "onCreate",
        type: "(data: Partial<TData>) => Promise<void> | void",
        required: false,
        description: "Called when the create row is saved. Throw to keep the row open and show backend errors via setError."
    },
    {
        name: "onDelete",
        type: "(id) => Promise<void> | void",
        required: false,
        description: "Called when delete is clicked. Accepts async functions."
    },
    {
        name: "onView",
        type: "(id) => void",
        required: false,
        description: "Called when view is clicked on a row. Adds a View option to the actions dropdown."
    },
    {
        name: "extraActions",
        type: "ExtraAction<TData>[]",
        required: false,
        description: "Additional items in the actions dropdown per row."
    },
    {
        name: "pagination",
        type: "{ pageSize?: number; total?: number; onPageChange?: (page, pageSize) => void }",
        required: false,
        description: "Pass pageSize for client-side pagination. Add total + onPageChange for server-side mode."
    },
];

const useTableReturns = [
    {
        name: "tableProps",
        type: "TableProps<TData>",
        description: "Spread directly into <DataGrid />. Contains all state and handlers."
    },
    {
        name: "setError",
        type: "(field: keyof TData, message: string) => void",
        description: "Sets a backend validation error on a field. Context-aware — targets the edit row if one is open, otherwise the create row."
    },
    {
        name: "setCreateErrors",
        type: "Dispatch<SetStateAction<FieldErrors>>",
        description: "Directly set the entire create row errors object. Use setCreateErrors({}) to clear all."
    },
    {
        name: "setEditErrors",
        type: "Dispatch<SetStateAction<FieldErrors>>",
        description: "Directly set the entire edit row errors object. Use setEditErrors({}) to clear all."
    },
];

const fieldTypes = [
    {type: "text", config: "placeholder?: string", description: "Single-line text input."},
    {
        type: "number",
        config: "placeholder?: string, decimalScale?: number, thousandSeparator?: boolean",
        description: "Numeric input via react-number-format. Supports formatting."
    },
    {
        type: "textarea",
        config: "placeholder?: string, rows?: number",
        description: "Multiline text input. resize-none by default."
    },
    {
        type: "select",
        config: "options: { value: string; label: string }[]",
        description: "Dropdown select from a fixed list of options."
    },
    {type: "date", config: "—", description: "Date picker input."},
    {type: "checkbox", config: "—", description: "Boolean checkbox. Displays as Yes/No in read mode."},
    {
        type: "virtualized-dropdown",
        config: "data: DropdownItem[], nameSet?, idSet?, single?, customEmptyMessage?",
        description: "Virtualized searchable dropdown for large datasets. Supports single and multi-select."
    },
];

const extraActionFields = [
    {name: "key", type: "string", description: "Unique key for the action item."},
    {name: "label", type: "string", description: "Display label in the dropdown."},
    {name: "icon", type: "React.ReactNode", description: "Optional icon rendered before the label."},
    {
        name: "onClick",
        type: "(id, resource) => void | Promise<void>",
        description: "Called when the action is clicked. Receives the row id and full resource object."
    },
    {name: "destructive", type: "boolean", description: "Renders the item in destructive (red) color."},
];

export default function DataGridPage() {
    return (
        <div className="w-full space-y-12">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Grid</h1>
                <p className="mt-3 leading-7 text-muted-foreground">
                    A table component with built-in inline row creation, editing, and deletion.
                    Define your fields once via <code className="rounded bg-muted px-1 py-0.5 text-sm">useTable</code> —
                    it handles column rendering, input types, edit state, client validation, backend error display,
                    and pagination. No TanStack required.
                </p>
            </div>

            {/* Preview */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Preview</h2>
                <DataGridDemo/>
            </div>

            {/* Installation */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Installation</h2>
                <CopyCommand command="npx jejeui add data-grid"/>
            </div>

            {/* How it works */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">How it works</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                    The grid has two special rows —
                    a <span className="text-foreground font-medium">create row</span> always visible at the top for
                    adding new records, and an <span className="text-foreground font-medium">edit row</span> that
                    replaces any existing row when editing is triggered. Both rows render inputs automatically based
                    on the <code className="rounded bg-muted px-1 py-0.5 text-xs">fields</code> definition.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    All state — which row is editing, which fields have errors, pagination position — lives inside{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">useTable</code>. You only need to provide
                    data, field definitions, and async handlers. If a handler throws, the row stays open so the user
                    can fix and retry. Use <code className="rounded bg-muted px-1 py-0.5 text-xs">setError</code> inside
                    a catch block to show backend validation messages below the relevant input.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    In read mode, each field auto-renders based on its type — checkboxes show Yes/No, selects show
                    their label, dates are formatted, virtualized dropdowns show the name. You can override any
                    field&#39;s read display with a custom{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">render</code> function.
                </p>
            </div>

            {/* Usage */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Usage</h2>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    {usageCode}
                </pre>
            </div>

            {/* Validation */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Validation</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-3">
                    Two layers of validation are supported. Client-side via the{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">validation</code> option — runs before any
                    network call and blocks submission if any field fails. Backend validation via{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">setError</code> — call it inside a catch
                    block after a failed API request. Errors clear automatically when the user edits the field.
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    {validationCode}
                </pre>
            </div>

            {/* Custom render */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Custom Read Display</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-3">
                    By default, each field auto-renders in read mode based on its type. Override this with a{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">render</code> function on any field.
                    Useful for truncating long text, rendering nested objects, or adding badges.
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    {renderOverrideCode}
                </pre>
            </div>

            {/* Pagination */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Pagination</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-3">
                    Pass <code className="rounded bg-muted px-1 py-0.5 text-xs">pagination</code> to enable it.
                    Client-side mode slices the data array automatically — just pass{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">pageSize</code>.
                    Server-side mode adds <code className="rounded bg-muted px-1 py-0.5 text-xs">total</code> and{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">onPageChange</code> — the grid tracks page
                    state and calls your handler when the page changes.
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    {serverPaginationCode}
                </pre>
            </div>

            {/* API note */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground mb-1">Throw to keep the row open</p>
                <p className="text-sm text-muted-foreground">
                    If <code className="rounded bg-muted px-1 py-0.5 text-xs">onSave</code> or{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">onCreate</code> throws,
                    the row stays open so the user can fix their input and retry. Always re-throw after calling{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">setError</code> — otherwise the row
                    closes and the error never shows.
                </p>
            </div>

            {/* useTable options */}
            <div>
                <h2 className="mb-1 text-lg font-semibold text-foreground">useTable Options</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                    All configuration lives here. Pass data, define fields, wire handlers, set up validation and
                    pagination.
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Option</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Required</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {useTableOptions.map((item, i) => (
                            <tr key={item.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-mono text-xs">{item.name}</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.type}</td>
                                <td className="px-4 py-3 text-xs">{item.required ? "Yes" : "No"}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{item.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* useTable returns */}
            <div>
                <h2 className="mb-1 text-lg font-semibold text-foreground">useTable Returns</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                    Spread <code className="rounded bg-muted px-1 py-0.5 text-xs">tableProps</code> directly into{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">DataGrid</code>. Use{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">setError</code> inside catch blocks for
                    backend errors.
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Return</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {useTableReturns.map((item, i) => (
                            <tr key={item.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-mono text-xs">{item.name}</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.type}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{item.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Field Types */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Field Types</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                    Every field in <code className="rounded bg-muted px-1 py-0.5 text-xs">fields</code> needs a{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">type</code>. This controls both the input
                    rendered in edit/create mode and the auto display in read mode. All types also accept{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">label</code>,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">size</code>, and{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">render</code>.
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Extra Config</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fieldTypes.map((s, i) => (
                            <tr key={s.type} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-mono text-xs">{s.type}</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.config}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{s.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DataGrid Props */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">DataGrid Props</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                    Most configuration lives in <code
                    className="rounded bg-muted px-1 py-0.5 text-xs">useTable</code>.{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">DataGrid</code> only needs{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">tableProps</code> plus a few display options.
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prop</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Required</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataGridProps.map((prop, i) => (
                            <tr key={prop.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-mono text-xs">{prop.name}</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                                <td className="px-4 py-3 text-xs">{prop.required ? "Yes" : "No"}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{prop.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ExtraActions */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">ExtraAction</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                    Add custom items to the actions dropdown per row via the{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">extraActions</code> option in{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">useTable</code>.
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Field</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {extraActionFields.map((item, i) => (
                            <tr key={item.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-mono text-xs">{item.name}</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.type}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">{item.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 mt-5 text-sm mb-4">
        {extraActionsCode}
    </pre>

            </div>

            {/* Sorting */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">Sorting</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-3">
                    Add <code className="rounded bg-muted px-1 py-0.5 text-xs">sortable: true</code> to any field for
                    client-side sorting.
                    For server-side sorting pass <code
                    className="rounded bg-muted px-1 py-0.5 text-xs">sort.onSortChange</code> —
                    the grid skips internal sorting and calls your handler instead.
                    Clicking a sort icon cycles <code className="rounded bg-muted px-1 py-0.5 text-xs">asc → desc</code>.
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
        {sortingCode}
    </pre>
            </div>

            {/* getInitialValue */}
            <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">getInitialValue</h2>
                <p className="text-sm leading-7 text-muted-foreground mb-3">
                    By default edit mode pre-fills inputs from the row&#39;s own field value.
                    Use <code className="rounded bg-muted px-1 py-0.5 text-xs">getInitialValue</code> to override this —
                    useful when the field key differs from the data shape, or when you need to derive the initial value
                    from a nested property.
                    Works on all field types.
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-sm">
        {getInitialValueCode}
    </pre>
            </div>

        </div>
    );
}