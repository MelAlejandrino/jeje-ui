"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {BookOpen, ChevronRight, Grid, Image, List, Search} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
    {
        title: "Introduction",
        href: "/docs",
        icon: BookOpen,
    },
];

const components = [
    {title: "Autocomplete", href: "/docs/components/autocomplete", icon: Search},
    {
        title: "Data Grid (Beta)",
        href: "/docs/components/data-grid",
        desc: "Inline CRUD table built on TanStack Table.",
        icon: Grid
    },
    {
        title: "Image Uploader",
        href: "/docs/components/image-uploader",
        icon: Image,
    },
    {
        title: "Virtualized Dropdown",
        href: "/docs/components/virtualized-dropdown",
        icon: List,
    },
];

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarContent className="bg-background border-r border-border">
                {/* Logo */}
                <div className="flex h-14 items-center border-b border-border px-4">
                    <Link
                        href="/"
                        className="font-bold text-lg tracking-tight text-foreground"
                    >
                        jeje<span className="text-muted-foreground">/ui</span>
                    </Link>
                </div>

                {/* Main nav */}
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={pathname === item.href}>
                                    <Link href={item.href}>
                                        <item.icon size={15}/>
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Components */}
                <SidebarMenu>
                    <Collapsible defaultOpen>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                    <ChevronRight
                                        size={15}
                                        className="transition-transform group-data-[state=open]/collapsible:rotate-90"
                                    />
                                    Components
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {components.map((item) => (
                                        <SidebarMenuSubItem key={item.href}>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={pathname === item.href}
                                                className="h-auto py-1.5"
                                            >
                                                <Link href={item.href}>
                                                    <item.icon size={13}/>
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
