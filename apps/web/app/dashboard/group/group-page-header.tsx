import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react"
import { GroupEditDialog } from "./group-edit-dialog";

export function GroupPageHeader() {
    return (
        <div className="flex h-14 items-center px-6 justify-between shadow-sm">
            <span className="normal text-lg">期会管理</span>
            <div className="">
                <GroupEditDialog>
                    <Button><PlusCircle /> 创建期会</Button>
                </GroupEditDialog>

            </div>
        </div>
    )
}