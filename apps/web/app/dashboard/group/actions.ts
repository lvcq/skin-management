'use server';

import { uuid } from "@/lib/password.helper";
import { session } from "@/lib/session.helper";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";


const groupPayload = z.object({
    group_name: z.string().max(32, '期会名称最长为32个字符'),
    description: z.string().max(256, '期会描述最长为256个字符').optional(),
})


export async function createGroup(payload: z.infer<typeof groupPayload>) {
    let prisma = new PrismaClient();
    console.log(payload);
    try {
        let user_id = await session().get('user_id');
        await prisma.group.create({
            data: {
                id: uuid(),
                user_id,
                group_name: payload.group_name,
                description: payload.description,
            }
        })

    } catch (err) {
        console.log(err);
    }
    finally {
        prisma.$disconnect();
    }

}
