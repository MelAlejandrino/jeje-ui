import Link from "next/link";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky w-full top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-foreground"
        >
          jeje<span className="text-muted-foreground">/ui</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/MelAlejandrino/jeje-ui"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
