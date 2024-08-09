import { GroupList } from "./group-list";
import { GroupPageHeader } from "./group-page-header";
import { GroupSearch } from "./group-search";



export default function GroupPage(){
    return (
        <div className="flex w-full overflow-hidden flex-col">
            <GroupPageHeader/>
            <div className="flex-1 flex overflow-hidden gap-6 p-6">
                <div className="w-80">
                    <GroupSearch/>
                    <div className="h-4"></div>
                    <GroupList/>
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    )
}