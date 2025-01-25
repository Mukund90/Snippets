import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation'

export async function creates(formData: FormData) {
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

  redirect('http://localhost:3000')
}

export default function NewSnippet() {
  return (
    <form action={creates}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          className="border-2 border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="title"
          name="title"
          placeholder="Enter your title"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          className="border-2 border-gray-300 rounded-md w-full p-2 h-16 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          id="description"
          name="description"
          placeholder="Enter your description"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-gray-900 px-5 py-3 mt-5 text-white rounded-2xl cursor-pointer hover:bg-orange-500"
      >
        Add New
      </button>
    </form>
  );
}
