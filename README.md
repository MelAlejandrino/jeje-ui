# jeje/ui

A collection of reusable components built on top of [shadcn/ui](https://ui.shadcn.com). Copy-paste ready, accessible, and customizable.

## About

jeje/ui extends shadcn/ui with components that are tedious to build from scratch but commonly needed in real projects. No extra wrappers, no new dependencies beyond what's necessary — just code you own.

## Components

| Component | Description |
|---|---|
| [Image Uploader](https://jeje-ui.vercel.app/docs/components/image-uploader) | Drag-and-drop image uploader with preview, validation, and React Hook Form support |
| [Virtualized Dropdown](https://jeje-ui.vercel.app/docs/components/virtualized-dropdown) | Performant dropdown with TanStack Virtual for large datasets. Supports single/multi-select and custom label keys |

## Installation

Components are installed individually using the shadcn CLI. No need to install the whole library.

```bash
# Image Uploader
npx shadcn@latest add https://jeje-ui.vercel.app/r/image-uploader.json

# Virtualized Dropdown
npx shadcn@latest add https://jeje-ui.vercel.app/r/virtualized-dropdown.json
```

Each command copies the component into your `components/ui/` directory and installs the required dependencies automatically.

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
- [Lucide React](https://lucide.dev) — icons
- [Next.js](https://nextjs.org) — framework
- [Tailwind CSS](https://tailwindcss.com) — styling

## License

MIT
