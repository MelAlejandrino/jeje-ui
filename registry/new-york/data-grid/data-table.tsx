import {Scroller} from '@/components/ui/scroller';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {DataTableProgressSpinner} from "@/registry/new-york/data-grid/data-table-progress-spinner";
import {DataTableCreateRow} from "@/registry/new-york/data-grid/data-table-create-row";
import {DataTableEditRow} from "@/registry/new-york/data-grid/data-table-edit-row";
import {DataTableActions} from "@/registry/new-york/data-grid/data-table-actions";
import {FieldDef, Resource, TableProps} from "@/registry/new-york/data-grid/types";

interface DataTableProps<TData extends Resource> {
    tableProps: TableProps<TData>;
    isLoading?: boolean;
    customEmptyMessage?: string;
}

export function DataTable<TData extends Resource>({
                                                      tableProps,
                                                      isLoading,
                                                      customEmptyMessage = 'No Results.',
                                                  }: DataTableProps<TData>) {
    const {
        rows,
        columns,
        editingRowId,
        isSubmitting,
        createErrors,
        editErrors,
        onSave,
        onCancelEdit,
        onCreate,
        onDelete,
        onView,
        onEdit,
        extraActions,
        onCancelCreate
    } = tableProps;

    return (
        <Scroller
            size={0}
            className="relative max-h-150 min-h-0 w-full rounded-md border"
        >
            {isLoading && <DataTableProgressSpinner isFetching={isLoading}/>}
            <Table className="w-full">
                <TableHeader className="bg-muted">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead
                                key={String(col.key)}
                                className="sticky top-0 z-10 bg-muted"
                                style={col.size !== undefined ? {
                                    minWidth: `${col.size}px`,
                                    width: `${col.size}px`,
                                } : undefined}
                            >
                                {col.label}
                            </TableHead>
                        ))}
                        <TableHead
                            className="sticky top-0 z-10 bg-muted"
                            style={{width: '1px', whiteSpace: 'nowrap'}}
                        />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* always-visible create row */}
                    {onCreate && (
                        <DataTableCreateRow
                            columns={columns}
                            onCreate={onCreate}
                            isSubmitting={isSubmitting}
                            errors={createErrors}
                            onCancel={onCancelCreate}
                        />
                    )}

                    {rows.length ? (
                        rows.map((row) => {
                            const isEditing = editingRowId !== null &&
                                editingRowId !== undefined &&
                                row.id === editingRowId;

                            if (isEditing) {
                                return (
                                    <DataTableEditRow
                                        key={row.id}
                                        row={row}
                                        columns={columns}
                                        onSave={onSave}
                                        onCancel={onCancelEdit}
                                        isSubmitting={isSubmitting}
                                        errors={editErrors}
                                    />
                                );
                            }

                            return (
                                <TableRow key={row.id}>
                                    {columns.map((col) => {
                                        const value = row[col.key];
                                        const field = col.field;

                                        // use custom render if provided
                                        if (field?.render) {
                                            return (
                                                <TableCell
                                                    key={String(col.key)}
                                                    className="border-r border-border last:border-r-0"
                                                    style={col.size !== undefined ? {
                                                        minWidth: `${col.size}px`,
                                                        width: `${col.size}px`,
                                                    } : undefined}
                                                >
                                                    {field.render(value as TData[keyof TData], row)}
                                                </TableCell>
                                            );
                                        }

                                        // auto render based on type
                                        return (
                                            <TableCell
                                                key={String(col.key)}
                                                className="border-r border-border last:border-r-0"
                                                style={col.size !== undefined ? {
                                                    minWidth: `${col.size}px`,
                                                    width: `${col.size}px`,
                                                } : undefined}
                                            >
                                                {autoRender(value, field)}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}>
                                        <DataTableActions
                                            resource={row}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                            onView={onView}
                                            extraActions={extraActions}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + 1}
                                className="h-24 text-center"
                            >
                                {customEmptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Scroller>
    );
}

function autoRender<TData extends Resource>(value: unknown, field: FieldDef<TData> | undefined): React.ReactNode {
    if (value === null || value === undefined) return <span className="text-muted-foreground">—</span>;

    if (!field) return <span>{String(value)}</span>;

    switch (field.type) {
        case "checkbox":
            return <span>{value ? "Yes" : "No"}</span>;
        case "date":
            return <span>{value instanceof Date ? value.toLocaleDateString() : String(value)}</span>;
        case "select": {
            const option = field.options.find((o) => o.value === value);
            return <span>{option?.label ?? String(value)}</span>;
        }
        case "virtualized-dropdown": {
            const nameSet = field.nameSet;
            if (typeof value === "object" && value !== null) {
                if (typeof nameSet === "function") return <span>{nameSet(value as Record<string, unknown>)}</span>;
                if (typeof nameSet === "string") return <span>{(value as Record<string, unknown>)[nameSet] as string}</span>;
            }
            return <span>{String(value)}</span>;
        }
        case "number":
            return (
                <span>
                    {typeof value === "number"
                        ? field.thousandSeparator
                            ? value.toLocaleString()
                            : value
                        : String(value)}
                </span>
            );
        default:
            return <span>{String(value)}</span>;
    }
}