import { cn } from '@/lib/utils'

import { DataTable } from '@/registry/new-york/data-grid/data-table'
import { DataTablePagination } from '@/registry/new-york/data-grid/data-table-pagination'
import { DataGridProps, Resource } from '@/registry/new-york/data-grid/types'

export const DataGrid = <TData extends Resource>({
    tableProps,
    className,
    isLoading,
    customEmptyMessage,
}: DataGridProps<TData>) => {
    return (
        <div className={cn('flex w-full flex-col items-center space-y-2', className)}>
            <DataTable tableProps={tableProps} isLoading={isLoading} customEmptyMessage={customEmptyMessage} />
            {tableProps.pagination && <DataTablePagination pagination={tableProps.pagination} />}
        </div>
    )
}
