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
                . Copy-paste ready, accessible, and customizable.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
                All components follow shadcn/ui conventions — install them directly into
                your project using the shadcn CLI. No extra dependencies, no wrappers,
                just code you own.
            </p>

            {/* Components */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-3">Components</h2>
                <div className="flex flex-col gap-2">
                    {components.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 hover:bg-muted transition-colors"
                        >
                            <div>
                                <p className="text-sm font-medium text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                            <ArrowRight size={15}
                                        className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"/>
                        </Link>
                    ))}
                </div>
            </div>

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