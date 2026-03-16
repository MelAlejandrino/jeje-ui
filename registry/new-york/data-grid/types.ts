import React from "react";

export interface Resource {
    id: number | string;

    [key: string]: unknown;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface DropdownItem {
    [key: string]: unknown;
}

export type FieldErrors = Record<string, string>;

// field definitions — controls both input and display
export type FieldDef<TData> =
    | {
    label: string;
    type: "text";
    placeholder?: string;
    size?: number;
    required?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "number";
    placeholder?: string;
    size?: number;
    required?: boolean;
    decimalScale?: number;
    thousandSeparator?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "textarea";
    placeholder?: string;
    size?: number;
    required?: boolean;
    rows?: number;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "checkbox";
    size?: number;
    required?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "date";
    size?: number;
    required?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "select";
    options: SelectOption[];
    size?: number;
    required?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
}
    | {
    label: string;
    type: "virtualized-dropdown";
    data: DropdownItem[];
    nameSet?: string | ((item: DropdownItem) => string);
    idSet?: string | ((item: DropdownItem) => string);
    getInitialValue?: (row: unknown) => unknown;
    single?: boolean;
    customEmptyMessage?: string;
    keepOpenOnSelect?: boolean;
    size?: number;
    required?: boolean;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode;
} | {
    label: string;
    type: "readonly";
    size?: number;
    render?: (value: TData[keyof TData], row: TData) => React.ReactNode
};

export type FieldsDef<TData> = Partial<Record<keyof TData, FieldDef<TData>>>;

export type ValidationFn<TData> = Partial<Record<keyof TData, (value: unknown, row: Partial<TData>) => string | null>>;

export interface ColumnMeta<TData> {
    key: keyof TData;
    label: string;
    size?: number;
    field?: FieldDef<TData>;
}

export interface ExtraAction<T extends Resource> {
    key: string;
    label: string;
    icon?: React.ReactNode;
    onClick: (id: T["id"], resource: T) => void | Promise<void>;
    destructive?: boolean;
}

export interface TableProps<TData extends Resource> {
    rows: TData[];
    columns: ColumnMeta<TData>[];
    editingRowId: TData["id"] | null;
    isSubmitting: boolean;
    createErrors: FieldErrors;
    editErrors: FieldErrors;
    onSave: (id: TData["id"], data: Partial<TData>) => Promise<void>;
    onCancelEdit: () => void;
    onCreate?: (data: Partial<TData>) => Promise<void>;
    onDelete?: (id: TData["id"]) => Promise<void> | void;
    onView?: (id: TData["id"]) => void;
    onEdit: (id: TData["id"]) => void;
    extraActions?: ExtraAction<TData>[];
    pagination?: PaginationState;
}

export interface DataGridProps<TData extends Resource> {
    tableProps: TableProps<TData>;
    className?: string;
    isLoading?: boolean;
    customEmptyMessage?: string;
}

export interface UseTableOptions<TData extends Resource> {
    data: TData[];
    fields: FieldsDef<TData>;
    validation?: ValidationFn<TData>;
    onSave?: (id: TData["id"], data: Partial<TData>) => Promise<void> | void;
    onCreate?: (data: Partial<TData>) => Promise<void> | void;
    onDelete?: (id: TData["id"]) => Promise<void> | void;
    onView?: (id: TData["id"]) => void;
    extraActions?: ExtraAction<TData>[];
    pagination?: {
        page?: number;
        pageSize?: number;
        total?: number;
        onPageChange?: (page: number, pageSize: number) => void;
    }
}

export interface PaginationState {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}
