"use client";

import { ChevronDown, Circle, Square, Triangle } from "lucide-react";

export default function CodeEditor({ code, setCode }) {
  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex items-center justify-between bg-[#1a1a1f] px-4 py-1 rounded-t-lg border border-b-0 border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <Circle className="w-2.5 h-2.5 text-red-500" />
          <Circle className="w-2.5 h-2.5 text-yellow-400" />
          <Circle className="w-2.5 h-2.5 text-green-500" />
          <span className="text-gray-400 text-xs font-medium ml-2">Source Snippet</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Paste your code here..."
        className="bg-[#0f0f11] border border-[#2a2a2a] rounded-b-lg p-4 h-80 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none shadow-inner"
      />
    </div>
  );
}
