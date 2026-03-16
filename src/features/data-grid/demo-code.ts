export const usageCode = `// 1. Define your interface — must extend Resource (requires [key: string]: unknown)
interface ServiceCategory {
  id: number | string
  name: string
  description?: string
  companies?: { id: number; name: string }[]
  company_ids: number[]
  [key: string]: unknown
}

// 2. Type your API response shape
type ServiceCategoryResponse = {
  data: {
    items: ServiceCategory[]
    total: number
    current_page: number
    per_page: number
  }
}

// 3. Typed fetch functions — let React Query infer from these
const fetchServiceCategories = async (page: number, pageSize: number): Promise<ServiceCategoryResponse> => {
  const res = await fetch(\`/api/proxy/service-category?page=\${page}&per_page=\${pageSize}\`)
  return res.json() as Promise<ServiceCategoryResponse>
}

const fetchCompanies = async (): Promise<CompanyResponse> => {
  const res = await fetch('/api/proxy/company')
  return res.json() as Promise<CompanyResponse>
}

// 4. Build your hook
export const useServiceCategories = () => {
  const queryClient = useQueryClient()
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })

  const { data, isFetching } = useQuery({
    queryKey: ['service-categories', pagination],
    queryFn: () => fetchServiceCategories(pagination.page, pagination.pageSize),
  })

  const { data: companyData } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  })

  const createMutation = useMutation({
    mutationFn: (newData: Partial<ServiceCategory>) =>
      fetch('/api/proxy/service-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      }).then(async res => {
        const json = await res.json()
        if (!res.ok) throw json
        return json
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['service-categories'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: ServiceCategory['id']; data: Partial<ServiceCategory> }) =>
      fetch(\`/api/proxy/service-category/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(async res => {
        const json = await res.json()
        if (!res.ok) throw json
        return json
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['service-categories'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: ServiceCategory['id']) =>
      fetch(\`/api/proxy/service-category/\${id}\`, { method: 'DELETE' }).then(async res => {
        const json = await res.json()
        if (!res.ok) throw json
        return json
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['service-categories'] }),
  })

  const companies = companyData?.data?.items

  const { tableProps, setError } = useTable<ServiceCategory>({
    data: data?.data.items || [],
    pagination: {
      page: pagination.page - 1,           // useTable is 0-indexed
      total: data?.data.total || 0,
      pageSize: pagination.pageSize,
      onPageChange: (page, pageSize) => {
        setPagination({ page: page + 1, pageSize })   // convert back to 1-indexed for API
      },
    },
    fields: {
      id:          { label: 'ID',          type: 'readonly' },
      name:        { label: 'Name',        type: 'text',     placeholder: 'Enter name...' },
      company_ids: {
        label: 'Companies',
        type: 'virtualized-dropdown',
        data: companies ?? [],
        nameSet: 'name',
        idSet: 'id',
        keepOpenOnSelect: true,
        size: 220,
        // read mode: render from row.companies instead of row.company_ids
        render: renderCompanies,
        // edit mode: pre-fill with full objects from row.companies
        getInitialValue: row => (row as ServiceCategory).companies,
      },
      description: { label: 'Description', type: 'text', placeholder: 'Enter description...' },
    },
    validation: {
      name: (value) => !value ? 'Name is required' : null,
    },
    onCreate: async (newData) => {
      try {
        const payload = {
          name: newData.name,
          description: newData.description,
          // map full objects back to IDs for the API
          company_ids: ((newData.company_ids as unknown as { id: number }[]) ?? []).map(c => c.id),
        }
        await createMutation.mutateAsync(payload)
      } catch (error: any) {
        // map backend field errors to inputs
        const details = error?.error?.details
        if (details) {
          Object.entries(details).forEach(([field, messages]) => {
            setError(field as keyof ServiceCategory, (messages as string[])[0])
          })
        }
        throw error   // re-throw so create row stays open
      }
    },
    onSave: async (id, updated) => {
      try {
        const payload = {
          name: updated.name,
          description: updated.description,
          company_ids: ((updated.company_ids as unknown as { id: number }[]) ?? []).map(c => c.id),
        }
        await updateMutation.mutateAsync({ id, data: payload })
      } catch (error: any) {
        const details = error?.error?.details
        if (details) {
          Object.entries(details).forEach(([field, messages]) => {
            setError(field as keyof ServiceCategory, (messages as string[])[0])
          })
        }
        throw error   // re-throw so edit row stays open
      }
    },
    onDelete: async (id) => {
      try {
        await deleteMutation.mutateAsync(id)
      } catch (error: any) {
        toast.error(error?.error?.message ?? 'Failed to delete')
      }
    },
  })

  return { tableProps, isLoading: isFetching }
}

// 5. Render
export const ServiceCategoriesView = () => {
  const { tableProps, isLoading } = useServiceCategories()
  return <DataGrid tableProps={tableProps} isLoading={isLoading} />
}`;

export const renderOverrideCode = `// render-companies.tsx  (must be .tsx since it returns JSX)
interface Props {
  row: ServiceCategory
}

const RenderCompanies = ({ row }: Props) => {
  const companies = (row.companies as { id: number; name: string }[]) ?? []
  if (!companies.length) return <span className="text-muted-foreground">—</span>
  return <span>{companies.map(c => c.name).join(', ')}</span>
}

// Export a plain function so it can be imported from a .ts hook file
export const renderCompanies = (_: unknown, row: unknown) => {
  return <RenderCompanies row={row as ServiceCategory} />
}

// Usage in useTable fields:
fields: {
  company_ids: {
    label: 'Companies',
    type: 'virtualized-dropdown',
    data: companies ?? [],
    nameSet: 'name',
    idSet: 'id',
    render: renderCompanies,           // read mode
    getInitialValue: row => (row as ServiceCategory).companies,  // edit mode pre-fill
  },
}`;

export const validationCode = `const { tableProps, setError } = useTable<ServiceCategory>({
  data,
  fields: { ... },

  // client-side: runs before any network call, blocks submission if any field fails
  validation: {
    name:   (value) => !value ? 'Name is required' : null,
    salary: (value) => (value as number) < 0 ? 'Must be positive' : null,
  },

  onCreate: async (data) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error: any) {
      // backend field errors — map details to inputs
      const details = error?.error?.details
      if (details) {
        Object.entries(details).forEach(([field, messages]) => {
          setError(field as keyof ServiceCategory, (messages as string[])[0])
        })
      }
      throw error   // re-throw so create row stays open
    }
  },

  onSave: async (id, data) => {
    try {
      await updateMutation.mutateAsync({ id, data })
    } catch (error: any) {
      const details = error?.error?.details
      if (details) {
        Object.entries(details).forEach(([field, messages]) => {
          setError(field as keyof ServiceCategory, (messages as string[])[0])
        })
      }
      throw error   // re-throw so edit row stays open
    }
  },
})`;

export const serverPaginationCode = `// Keep pagination state in your hook
const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })

// Pass current page data from your API — useTable won't slice it
const { tableProps } = useTable<Employee>({
  data,           // already the current page from your API
  fields: { ... },
  pagination: {
    page: pagination.page - 1,     // useTable is 0-indexed, API is usually 1-indexed
    total: data?.total || 0,       // total record count from API for page count calculation
    pageSize: pagination.pageSize,
    onPageChange: (page, pageSize) => {
      // page here is 0-indexed — convert back to 1-indexed for your API
      setPagination({ page: page + 1, pageSize })
    },
  },
})`;

export const extraActionsCode = `extraActions: [
  {
    key: 'duplicate',
    label: 'Duplicate',
    icon: <Copy className="h-4 w-4" />,
    onClick: async (id, resource) => {
      await createMutation.mutateAsync({
        name: \`\${resource.name} (copy)\`,
        description: resource.description,
      })
    },
  },
  {
    key: 'archive',
    label: 'Archive',
    icon: <Archive className="h-4 w-4" />,
    onClick: async (id) => {
      await archiveMutation.mutateAsync(id)
    },
    destructive: true,
  },
]`;