"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";

export default async function Extradata(id:number,code:string)
{
     await prisma.snippets.update({
        where:{
            id,
        },
        data:{
            code
        }
    });

    redirect(`/snippet/${id}`)

    
}
export async function Delete_snippets(id:number)
{
    await prisma.snippets.delete({
        where:{

            id 
        }
    })

   redirect(`/snippet/${id}`);
}