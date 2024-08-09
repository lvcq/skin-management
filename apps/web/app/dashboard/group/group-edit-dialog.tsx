'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createGroup } from "./actions";
import { useEffect, useState } from "react";

interface GroupEditDialogProps {
    children: React.ReactNode
}


const groupScheme = z.object({
    group_name: z.string().min(1, { message: "请输入期会名称" }).max(32, { message: "期会名称不能超过32个字符" }),
    description: z.string(),
});

export function GroupEditDialog({ children }: GroupEditDialogProps) {

    let [open, setOpen] = useState(false);

    let form = useForm({
        resolver: zodResolver(groupScheme),
        defaultValues: {
            group_name: "",
            description: "",
        }
    });

    async function onSubmit(values: z.infer<typeof groupScheme>) {
        console.log(values);
        try {
            await createGroup(values);
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(!open){
            form.reset();
        }
    },[open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>创建/编辑期会</DialogTitle>
                    <DialogDescription>输入期会相关信息，点击保存按钮提交。</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="group_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>期会名称</FormLabel>
                                        <FormControl >
                                            <Input placeholder="请输入..." {...field} maxLength={32} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>期会描述</FormLabel>
                                        <FormControl >
                                            <Textarea placeholder="请输入..." {...field} maxLength={256} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">保存</Button>
                                <DialogClose>
                                    <Button variant="outline" onClick={() => { }}>
                                        取消
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>

            </DialogContent>

        </Dialog>
    )
}