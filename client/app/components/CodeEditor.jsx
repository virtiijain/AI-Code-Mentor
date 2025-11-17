"use client";

import { ChevronDown, Circle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { javascript } from "@codemirror/lang-javascript";

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

      <div className="border border-[#2a2a2a] rounded-b-lg overflow-hidden bg-[#0f0f11]">
        <CodeMirror
          value={code}
          height="320px"
          theme={tokyoNight}
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
          }}
          className="text-sm"
        />
      </div>
    </div>
  );
}
