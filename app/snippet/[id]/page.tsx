import { Delete_snippets } from "@/action/page";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Snippet_view({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);

  const data = await prisma.snippets.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    console.log("Data is not there!");
  }

    const data1 = Delete_snippets.bind(null,id);

  return (
    <div>
      {data ? (
        <div className="bg-slate-200 px-5 py-3 rounded-2xl w-full ">

          <div className="flex justify-between items-center mb-4">
            <p className="tracking-wider font-serif font-semibold text-lg">
              {data?.title.toLocaleUpperCase()}
            </p>
            <div className="flex gap-3">
              
              <Link href={`snippet${id}/edit`}><button className="text-white bg-slate-900 px-6 py-2 rounded-2xl text-center cursor-pointer hover:bg-slate-700">
                Edit
              </button>
              </Link>
            
              <form action={data1}>
              <button className="text-white bg-orange-300 px-5 py-2 rounded-2xl text-center cursor-pointer hover:bg-orange-500">
                Delete
              </button>
              </form>
             
              
             
            </div>
          </div>

          
          <div className="bg-slate-100 p-4 rounded-lg">
            <pre>
              <code>{data.code}</code>
            </pre>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
