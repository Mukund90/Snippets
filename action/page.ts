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

export async function creates(formData: FormData):Promise<any> {
    "use server"; 
  
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
  
    if (!title || !description) {
      throw new Error("Title and description are required");
    }
  
    const data = await prisma.snippets.create({
      data: {
        title,
        code: description,
      },
    });
  
    console.log("Snippet created:", data);
  
    redirect('/');
  }