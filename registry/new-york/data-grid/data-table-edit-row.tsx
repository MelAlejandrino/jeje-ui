import {useEffect, useState} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {DataTableCellRenderer} from "./data-table-cell-renderer";
import {DataTableFormActions} from "./data-table-form-actions";
import {ColumnMeta, FieldErrors, Resource} from "./types";

interface DataTableEditRowProps<TData extends Resource> {
    row: TData;
    columns: ColumnMeta<TData>[];
    onSave: (id: TData["id"], data: Partial<TData>) => Promise<void>;
    onCancel: () => void;
    isSubmitting?: boolean;
    errors?: FieldErrors;
}

export function DataTableEditRow<TData extends Resource>({
                                                             row,
                                                             columns,
                                                             onSave,
                                                             onCancel,
                                                             isSubmitting = false,
                                                             errors = {},
                                                         }: DataTableEditRowProps<TData>) {
    const [formData, setFormData] = useState<Partial<TData>>(row);
    const [clearedFields, setClearedFields] = useState<Set<string>>(new Set());

    const handleChange = (key: keyof TData, value: unknown) => {
        setClearedFields((prev) => new Set(prev).add(String(key)));
        setFormData((prev) => ({...prev, [key]: value}));
    };

    const handleSave = async () => {
        await onSave(row.id, formData);
    };

    const handleCancel = () => {
        setClearedFields(new Set());
        onCancel();
    };

    const mergedErrors: FieldErrors = Object.fromEntries(
        Object.entries(errors).filter(([key]) => !clearedFields.has(key))
    );

    const isDirty = JSON.stringify(formData) !== JSON.stringify(row);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setClearedFields(new Set());
        }
    }, [errors]);

    return (
        <TableRow className="bg-blue-50/40 hover:bg-blue-50/40 dark:bg-blue-950/20 dark:hover:bg-blue-950/20">
            {columns.map((col) => {
                const field = col.field;
                return (
                    <TableCell
                        key={String(col.key)}
                        className="border-r border-border last:border-r-0"
                        style={col.size !== undefined ? {
                            minWidth: `${col.size}px`,
                            width: `${col.size}px`,
                        } : undefined}
                    >
                        {field ? (
                            <DataTableCellRenderer
                                field={field}
                                value={formData[col.key] ?? ""}
                                onChange={(val) => handleChange(col.key, val)}
                                disabled={isSubmitting}
                                error={mergedErrors[String(col.key)]}
                            />
                        ) : (
                            <span className="text-sm text-muted-foreground">
                                {String(row[col.key] ?? "")}
                            </span>
                        )}
                    </TableCell>
                );
            })}
            <TableCell style={{width: "1px", whiteSpace: "nowrap"}}>
                <DataTableFormActions
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isSubmitting={isSubmitting}
                    disabled={!isDirty}
                />
            </TableCell>
        </TableRow>
    );
}