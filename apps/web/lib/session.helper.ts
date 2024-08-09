import { Account, PrismaClient } from "@prisma/client"
import { NextApiRequest } from "next"
import nextAppSession from "next-app-session"

interface SessionData{
    user_id?:string
}


export const session = nextAppSession<SessionData>({
    secret: process.env.SESSION_SECRET_KEY,
    name: 'access_token',
    cookie:{
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 60*60*12
    }   
})


export async function getAccount(req?:NextApiRequest):Promise<Account|null>{
    let prisma = new PrismaClient();
    try{
        let user_id = await session(req).get('user_id');
        if(!user_id){
            return null
        }
        return await prisma.account.findFirst({
            where:{
                id: user_id
            }
        });
    }catch(err){
        console.log(err);
        return null;
    }finally{
        prisma.$disconnect();
    }
  
}

