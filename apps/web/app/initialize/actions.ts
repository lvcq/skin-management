"use server";

import { sha256, uuid } from "@/lib/password.helper";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(6, {
        message: "超级管理员帐号至少为6个字符"
    }),
    password: z.string().min(8, {
        message: "密码长度为8-16位"
    }).max(16, {
        message: "密码长度为8-16位"
    }),
    repeatPassword: z.string()
});


export async function createAdmin(prevState: any, formData: FormData) {
    const validatedFileds = formSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        repeatPassword: formData.get('repeatPassword')
    })
    let message = ""

    if (!validatedFileds.success) {
        let errors = validatedFileds.error.flatten().fieldErrors;
        if (errors.username) {
            message = errors.username.join();
        }
        if (errors.password) {
            message = errors.password.join();
        }
        if (errors.repeatPassword) {
            message = errors.repeatPassword.join();
        }
    }
    if (formData.get('password') !== formData.get('repeatPassword')) {
        message = "两次输入的密码不一致"
    }
    if (message) {
        return {
            message
        }
    }


    let result = await createAdminUser(formData.get('username') as string, formData.get('password') as string);
    if(!result){
        redirect('/dashboard')
    }
    return {
        message: result
    }

}

async function createAdminUser(username: string, password: string) {
    const prisma = new PrismaClient();
    try {
        let signedPassword = await sha256(password);
        await prisma.account.create({
            data: {
                id: uuid(),
                username,
                password: signedPassword
            }
        });
        return ""
    } catch (err) {
        console.log(err);
        return "创建失败";
    } finally {
        prisma.$disconnect();
    }
}