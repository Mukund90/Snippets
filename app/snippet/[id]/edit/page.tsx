
import { prisma } from '@/lib/prisma';
import React from 'react';
import { Edit_snippets } from '@/Components';


export default async function Snippet_view({ params }: { params: { id: string } }) {
  try {
    
    const data = params.id;
    const data_id = parseInt(data.slice(7), 10); 
    console.log(data_id);

 
    const snippet = await prisma.snippets.findUnique({
      where: {
        id: data_id, 
      },
    });

    if (!snippet) {
      return (
        <div>
          <h1>Snippet not found</h1>
        </div>
      );
    }

    return (
      <div>
        <Edit_snippets snippet={snippet}/>
      </div>
    );
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return (
      <div>
        <h1>Error fetching snippet</h1>
        <p>{String(error)}</p>
      </div>
    );
  }
}
