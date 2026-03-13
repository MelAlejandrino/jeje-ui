import Link from "next/link";
import {ArrowRight, Github} from "lucide-react";
import {components} from "@/features/docs/constant";

export const DocsPageView = () => {
    return (
        <>
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
                . Practical, copy-paste React components designed for dashboards,
                admin panels, and internal tools — but flexible enough for any project.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
                All components follow shadcn/ui conventions — install them directly into
                your project using the shadcn CLI. No extra dependencies, no wrappers,
                just code you own.
            </p>

            {/* GitHub */}
            <div className="mt-8">
                <Link
                    href="https://github.com/MelAlejandrino/jeje-ui"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Github size={15}/>
                    View on GitHub
                </Link>
            </div>
        </>
    );
}