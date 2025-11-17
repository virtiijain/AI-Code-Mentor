"use client";

import { Terminal, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { highlightCode } from "../lib/shiki";

export default function OutputBox({ output }) {
  const [formattedBlocks, setFormattedBlocks] = useState([]);
  const [copied, setCopied] = useState(false);

  // toggle copy
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // detect code blocks
  const extractBlocks = (text) => {
    const lines = text.split("\n");
    const blocks = [];

    let currentCode = [];
    let inCode = false;

    lines.forEach((line) => {
      if (line.trim().startsWith("```")) {
        if (inCode) {
          blocks.push({ type: "code", content: currentCode.join("\n") });
          currentCode = [];
        }
        inCode = !inCode;
      } else {
        if (inCode) currentCode.push(line);
        else blocks.push({ type: "text", content: line });
      }
    });

    return blocks;
  };

  // highlight code blocks using shiki
  useEffect(() => {
    const format = async () => {
      if (!output) return setFormattedBlocks([]);

      const rawBlocks = extractBlocks(output);

      const final = await Promise.all(
        rawBlocks.map(async (blk) => {
          if (blk.type === "code") {
            const html = await highlightCode(blk.content, "javascript");
            return { ...blk, highlighted: html };
          }
          return blk;
        })
      );

      setFormattedBlocks(final);
    };

    format();
  }, [output]);

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex items-center gap-2 px-3 pb-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
        <Terminal className="w-4 h-4 text-indigo-400" />
        <span>AI Explanation</span>
      </div>

      <div className="relative bg-[#111118] border border-[#26262a] rounded-lg p-4 h-64 overflow-y-auto text-sm leading-relaxed text-gray-300 shadow-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-900">
        {!output && (
          <p className="text-gray-500 italic">
            Your AI-generated explanation will appear here...
          </p>
        )}

        {formattedBlocks.map((block, i) =>
          block.type === "text" ? (
            <p key={i} className="mb-2">{block.content}</p>
          ) : (
            <div key={i} className="relative mb-4">
              <button
                onClick={() => copyToClipboard(block.content)}
                className="absolute top-2 right-2 text-gray-400 hover:text-indigo-400 transition z-10"
              >
                <Copy className="w-4 h-4" />
              </button>

              <div
                className="overflow-x-auto rounded-lg border border-[#2a2a30]"
                dangerouslySetInnerHTML={{ __html: block.highlighted }}
              />
            </div>
          )
        )}

        {output && (
          <div className="mt-3 p-2 bg-[#1b1b24] rounded text-xs text-gray-400 border border-[#26262a]">
            💡 Tip: Highlighting powered by Shiki — dev vibes max.
          </div>
        )}
      </div>
    </div>
  );
}
