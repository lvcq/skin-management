import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InitializeForm } from "./initialize-form";


export default function Initialize() {
   

    return <div className="h-full w-full flex justify-center items-center">
        <Card>
            <CardHeader>
                <CardTitle>初始化系统</CardTitle>
                <CardDescription>为系统添加超级管理员</CardDescription>
            </CardHeader>
            <CardContent>
                   <InitializeForm/>
            </CardContent>
        </Card>
    </div>
}