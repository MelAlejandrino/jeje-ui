import Link from "next/link";
import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Built on top of shadcn/ui
      </div>

      {/* Headline */}
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Components you actually{" "}
        <span className="text-muted-foreground">need.</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
        Accessible shadcn/ui components built with React, TypeScript, and
        Tailwind CSS. Copy-paste ready, and customizable.
      </p>

      {/* CTA */}
      <div className="mt-10 flex items-center gap-3">
        <Button asChild>
          <Link href="/docs">
            View Components <ArrowRight size={15} className="ml-1" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="https://github.com/MelAlejandrino/jeje-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} className="mr-1" /> Github
          </Link>
        </Button>
      </div>
    </div>
  );
};
