import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";


export default function LoginPage() {

    return (
        <div className="h-full w-full flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>欢迎使用哇卡期会管理工具</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}