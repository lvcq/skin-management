
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function GroupSearch(){
    return (
        <div className="relative">
            <Search className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"/>
        </div>
    )
}