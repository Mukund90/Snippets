import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function Home() {

  const dbdata = await prisma.snippets.findMany();
  if(!dbdata) {return ('data is not there!')};

  return (
   <div className=" ">
    <h1 className="font-bold text-3xl tracking-wider">Home</h1>
    <div className="flex  items-center gap-5 justify-between">
      <h1 className="text-xl tracker-wider">Snippets</h1>
      <Link href={'/snippet/new'}><button className="text-lg text-center bg-green-600 rounded-2xl px-5 py-1 text-white">add</button></Link>
    </div>
    {dbdata?(dbdata.map((item)=>
    {
      return(
        <div  className="flex justify-between item-center mt-5 bg-orange-700 rounded-2xl px-5 py-3 border-s-gray-700 shadow-2xl cursor-pointer" key ={item.id}>
           <p className="font-xl text-white">Title : {item.title}</p>
           <Link href={`/snippet/${item.id}`}><button className="text-center bg-gray-900 text-white rounded-2xl px-5 py-1 cursor-pointer">Edit</button></Link>
          </div>
      )
    })):(
      <p>Loading.....</p>
    )}
   </div>
  );
}
