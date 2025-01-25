"use client";

import { Editor } from "@monaco-editor/react";
import type { snippets } from "@prisma/client";
import { useState } from "react";
import Extradata from "@/action/page"; // Assuming Extradata is a server-side action


export function Edit_snippets({ snippet }: { snippet: snippets }) {
  const [code, setCode] = useState(snippet.code);


  const handleSave = async () => {
  
    try {
     
      await Extradata(snippet.id, code);
      alert("Snippet updated successfully!");
    } catch (error) {
      console.error("Failed to update snippet:", error);
      alert("Failed to update snippet.");
    }
  };


  

  return (
    <div className="flex flex-col items-center justify-start p-6 overflow-hidden">
      <div className=" px-6 py-4 rounded-xl text-3xl font-semibold tracking-wider flex justify-between items-center w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-black">Your Code Editor</h1>
        <button
          onClick={handleSave} 
          className="px-5 py-2 text-center rounded-2xl bg-slate-900 text-white text-lg font-semibold hover:bg-slate-800"
        >
          Save it
        </button>
      </div>

      <div className="w-full max-w-4xl mt-5 overflow-hidden">
        <Editor
          height="60vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 16,
            scrollBeyondLastLine: false, 
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
