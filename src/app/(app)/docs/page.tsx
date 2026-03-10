import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Introduction
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        jeje/ui is a collection of reusable components built on top of{" "}
        <Link
          href="https://ui.shadcn.com"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          shadcn/ui
        </Link>
        . Copy-paste ready, accessible, and customizable.
      </p>
      <p className="mt-4 leading-7 text-muted-foreground">
        All components follow shadcn/ui conventions — install them directly into
        your project using the shadcn CLI. No extra dependencies, no wrappers,
        just code you own.
      </p>
    </div>
  );
}
