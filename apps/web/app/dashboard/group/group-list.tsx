import { PrismaClient } from "@prisma/client"

interface ListQuery{
    name?: string
}

async function getListData(query?: ListQuery) {
    let prisma = new PrismaClient();
    try{
        let result = await prisma.group.findMany({
            where: {
                group_name: {
                    contains: query?.name
                }
            }
        });
        return result;
    }catch(e){
        console.log(e);
        return [];
    }
    finally{
        await prisma.$disconnect();
    }
}


export async function GroupList(){
    const list =  await getListData();
    return(
        <div> grouplist {list?.length}</div>
    )
}