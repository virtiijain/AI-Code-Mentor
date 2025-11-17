"use client";

import { Terminal } from "lucide-react";

export default function OutputBox({ output }) {
  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex items-center gap-2 px-3 pb-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
        <Terminal className="w-4 h-4 text-indigo-400" />
        <span>AI Explanation</span>
      </div>

      <div className="relative bg-[#111118] border border-[#26262a] rounded-lg p-4 h-64 overflow-y-auto text-sm leading-relaxed text-gray-300 shadow-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-900">
        {output ? (
          output.split("\n").map((line, idx) => (
            <p key={idx} className="mb-1">
              {line.includes("```") ? (
                <code className="bg-[#1f1f25] px-1 rounded text-indigo-400">
                  {line.replace(/```/g, "")}
                </code>
              ) : (
                line
              )}
            </p>
          ))
        ) : (
          <p className="text-gray-500 italic">
            Your AI-generated explanation will appear here...
          </p>
        )}

        {output && (
          <div className="mt-3 p-2 bg-[#1b1b24] rounded text-xs text-gray-400 border border-[#26262a]">
            💡 Tip: You can copy any code snippet above and try it in your
            editor!
          </div>
        )}
      </div>
    </div>
  );
}
