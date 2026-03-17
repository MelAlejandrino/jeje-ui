# jeje/ui

A collection of reusable components built on top of [shadcn/ui](https://ui.shadcn.com). Copy-paste ready, accessible, and customizable.

## About

jeje/ui extends shadcn/ui with components that are tedious to build from scratch but commonly needed in real projects. No extra wrappers, no new dependencies beyond what's necessary — just code you own.

## Components

| Component | Description |
|---|---|
| [Image Uploader](https://jeje-ui.vercel.app/docs/components/image-uploader) | Drag-and-drop image uploader with preview, validation, and React Hook Form support |
| [Virtualized Dropdown](https://jeje-ui.vercel.app/docs/components/virtualized-dropdown) | Performant dropdown with TanStack Virtual for large datasets. Supports single/multi-select and custom label keys |
| [Autocomplete](https://jeje-ui.vercel.app/docs/components/autocomplete) | Combobox-style autocomplete with filtering, free-form input, and loading state |
| [Data Grid](https://jeje-ui.vercel.app/docs/components/data-grid) | Inline CRUD table with create, edit, delete, client/backend validation, sortable columns, and server-side pagination |

## Installation

Components are installed individually using the jejeui CLI or shadcn CLI directly.
```bash
# Using jejeui CLI (recommended)
npx jejeui add data-grid
npx jejeui add virtualized-dropdown
npx jejeui add autocomplete
npx jejeui add image-uploader

# Or using shadcn CLI directly
npx shadcn@latest add https://jeje-ui.vercel.app/r/data-grid.json
npx shadcn@latest add https://jeje-ui.vercel.app/r/virtualized-dropdown.json
npx shadcn@latest add https://jeje-ui.vercel.app/r/autocomplete.json
npx shadcn@latest add https://jeje-ui.vercel.app/r/image-uploader.json
```

Each command copies the component files into your project and installs required dependencies automatically.

## Requirements

- React 18+
- Next.js 14+ (or any React framework)
- [shadcn/ui](https://ui.shadcn.com) initialized in your project
- Tailwind CSS v4

## Docs

Full documentation with live previews and props reference at [jeje-ui.vercel.app](https://jeje-ui.vercel.app).

## Built With

- [shadcn/ui](https://ui.shadcn.com) — component primitives and CLI
- [Radix UI](https://www.radix-ui.com) — accessible UI primitives
- [TanStack Virtual](https://tanstack.com/virtual) — virtualization for large lists
- [react-number-format](https://s-yadav.github.io/react-number-format/) — numeric input formatting
- [date-fns](https://date-fns.org) — date utilities
- [Lucide React](https://lucide.dev) — icons
- [Next.js](https://nextjs.org) — framework
- [Tailwind CSS](https://tailwindcss.com) — styling

## License

MIT