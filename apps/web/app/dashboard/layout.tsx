import { ReactNode } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Group } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import Link from "next/link";


interface DashboardLayoutProps {
    children: Readonly<ReactNode>
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

    return (
        <div className="reletive min-h-screen flex flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center px-6">
                    <span className="hidden font-bold sm:inline-block">哇卡期会管理工具</span>
                </div>
            </header>
            <main className="flex-1 overflow-hidden flex flex-col">
                <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                    <ResizablePanel defaultSize={16}>
                        <Command className="mt-6 ml-6">
                            <CommandInput placeholder="搜索" />
                            <CommandList>
                                <CommandEmpty>相关结果为空</CommandEmpty>
                                <CommandGroup>
                                    <Link href="/dashboard/group">
                                        <CommandItem>
                                            <Group className="mr-2 h-4 w-4"></Group>
                                            <span>期会管理</span>
                                        </CommandItem>
                                    </Link>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </ResizablePanel>
                    <ResizableHandle withHandle></ResizableHandle>
                    <ResizablePanel>
                        {children}
                    </ResizablePanel>

                </ResizablePanelGroup>
            </main>
        </div>

    )
}