"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginAction }  from "./actions";
import { signClientPassword, uuid } from "@/lib/password.helper";
import useAction from "@/hooks/useAction";


const formScheme = z.object({
    username: z.string().min(6, { message: "用户名长度至少为6个字符" }),
    password: z.string().min(8,{message:"密码长度为8-16位"}).max(16,{message:"密码长度为8-16位"})
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formScheme>>({
        resolver: zodResolver(formScheme),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const {run,loading,error,message} = useAction(loginAction);

    async function  onSubmit(values: z.infer<typeof formScheme>) {
        try{

            let {password,username} =values;
            let rand = uuid();
            let now = new Date().getTime().toString();
            let signature = await signClientPassword(password,now, rand);
            run({
                username,
                signature,
                timestamp:now,
                rand
            });

        }catch(err){
            console.log(err)
        }
       
    }

    return (
        <Form
            {...form}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>用户名称</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入..." {...field}></Input>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >

                </FormField>
                <FormField control={form.control} name="password" render={({field})=>(
                    <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                            <Input placeholder="请输入..." {...field} type="password"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                {(error&&message)?(<p className="mt-1 text-red-500">{message}</p>):''}               
                <Button type="submit" disabled={loading}>登录</Button>
            </form>
        </Form>
    )
}