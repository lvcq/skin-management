
"use server"
import { signServerPassword } from '@/lib/password.helper'
import { ResponseHelper } from '@/lib/resoonse.helper'
import { session } from '@/lib/session.helper'
import { Account, PrismaClient } from '@prisma/client'
import { redirect } from "next/navigation"
import { z } from 'zod'


const formScheme = z.object({
    username: z.string().min(6, { message: "用户名长度至少为6个字符" }),
    signature: z.string(),
    timestamp: z.string(),
    rand: z.string()
})

export async function loginAction(payload: z.infer<typeof formScheme>) {

    // 1. 根据用户名称从数据库获取对应用户，如果用户不存在，返回 用户名或者密码错误信息
    let account = await getAccountFromDB(payload.username);
    if (account === null) {
        return ResponseHelper.error("用户名称或者密码错误");
    }
    
    // 2. 校验用户密码是否正确，如果错误，返回 用户名或者密码错误 

    if (!(await validatePassword(account.password, payload.timestamp, payload.rand, payload.signature))) {
        return ResponseHelper.error("用户名称或者密码错误");
    }

    await session().set('user_id',account.id)
    return redirect("/dashboard")
}

async function getAccountFromDB(username: string): Promise<Account | null> {
    let prisma = new PrismaClient();
    try {
        let result = await prisma.account.findFirst({
            where: {
                username: username
            }
        });
        return result
    } catch (err) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect();
    }
}

async function validatePassword(password: string, timestamp: string, rand: string, inputSignature: string): Promise<boolean> {
    let signature = await signServerPassword(password, timestamp, rand)
    return inputSignature === signature
}
