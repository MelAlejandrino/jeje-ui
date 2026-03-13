export const usageCode = `import { useState } from "react";
import { DataGrid } from "@/registry/new-york/data-grid/data-grid";
import { useTable } from "@/registry/new-york/data-grid/use-table";

interface Employee {
  id: number;
  name: string;
  salary: number;
  status: string;
  department: { id: number; name: string };
  is_active: boolean;
}

const STATUS_OPTIONS = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
];

const DEPARTMENTS = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Design" },
];

export const EmployeeTable = () => {
  const [data, setData] = useState<Employee[]>([]);

  const { tableProps, setError } = useTable<Employee>({
    data,
    fields: {
      name:       { label: "Name",       type: "text",     placeholder: "Enter name..." },
      salary:     { label: "Salary",     type: "number",   thousandSeparator: true, decimalScale: 2 },
      status:     { label: "Status",     type: "select",   options: STATUS_OPTIONS },
      department: { label: "Department", type: "virtualized-dropdown", data: DEPARTMENTS, nameSet: "name", idSet: "id", single: true },
      is_active:  { label: "Active",     type: "checkbox" },
    },
    validation: {
      name: (value) => !value ? "Name is required" : null,
    },
    pagination: { pageSize: 10 },
    onSave: async (id, updated) => {
      try {
        await axios.patch(\`/api/employees/\${id}\`, updated);
        await refetch();
      } catch (err) {
        setError("name", "Name already exists");
        throw err;
      }
    },
    onCreate: async (newData) => {
      try {
        await axios.post("/api/employees", newData);
        await refetch();
      } catch (err) {
        setError("name", "Name already exists");
        throw err;
      }
    },
    onDelete: async (id) => {
      await axios.delete(\`/api/employees/\${id}\`);
      await refetch();
    },
  });

  return <DataGrid tableProps={tableProps} />;
};`;

export const validationCode = `const { tableProps, setError } = useTable<Employee>({
  data,
  fields: { ... },

  // client-side: runs before any network call
  validation: {
    name:   (value) => !value ? "Name is required" : null,
    salary: (value) => (value as number) < 0 ? "Must be positive" : null,
    age:    (value) => (value as number) > 120 ? "Invalid age" : null,
  },

  onSave: async (id, data) => {
    try {
      await axios.patch(\`/api/employees/\${id}\`, data);
    } catch (err) {
      // backend error — setError targets the edit row
      setError("name", "Name already taken");
      throw err; // re-throw to keep edit row open
    }
  },

  onCreate: async (data) => {
    try {
      await axios.post("/api/employees", data);
    } catch (err) {
      // backend error — setError targets the create row
      setError("name", "Name already taken");
      throw err;
    }
  },
});`;

export const renderOverrideCode = `fields: {
  notes: {
    label: "Notes",
    type: "textarea",
    rows: 2,
    // override how the value displays in read mode
    render: (value) => (
      <span className="line-clamp-1 text-muted-foreground">{String(value ?? "")}</span>
    ),
  },
  department: {
    label: "Department",
    type: "virtualized-dropdown",
    data: DEPARTMENTS,
    nameSet: "name",
    idSet: "id",
    single: true,
    // render the nested object in read mode
    render: (value) => (
      <span>{(value as { name: string })?.name ?? "—"}</span>
    ),
  },
}`;

export const serverPaginationCode = `const { tableProps } = useTable<Employee>({
  data,       // current page data from your API
  fields: { ... },
  pagination: {
    pageSize: 10,
    total: 100,   // total record count from API
    onPageChange: (page, pageSize) => {
      // refetch with new page params
      refetch({ page, pageSize });
    },
  },
});`;