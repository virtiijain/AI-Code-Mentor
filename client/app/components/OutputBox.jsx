"use client";

import { Terminal, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { highlightCode } from "../lib/shiki";
import mermaid from "mermaid";

export default function OutputBox({ output }) {
  const [formattedBlocks, setFormattedBlocks] = useState([]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const sanitizeMermaid = (str) => str.replace(/"/g, "'");

  const extractBlocks = (text) => {
    const lines = text.split("\n");
    const blocks = [];
    let currentCode = [];
    let inCode = false;
    let codeType = "javascript";

    lines.forEach((line) => {
      if (line.trim().startsWith("```")) {
        if (inCode) {
          blocks.push({
            type: "code",
            content: currentCode.join("\n"),
            lang: codeType,
          });
          currentCode = [];
        }
        inCode = !inCode;
        codeType = line.replace(/```/g, "").trim() || "javascript";
      } else {
        if (inCode) currentCode.push(line);
        else blocks.push({ type: "text", content: line });
      }
    });

    return blocks;
  };

  useEffect(() => {
    const format = async () => {
      if (!output) return setFormattedBlocks([]);

      const rawBlocks = extractBlocks(output);

      const final = await Promise.all(
        rawBlocks.map(async (blk, i) => {
          if (blk.type === "code") {
            if (blk.lang === "mermaid") {
              return { ...blk, id: `mermaid-${i}` };
            } else {
              const html = await highlightCode(blk.content, blk.lang);
              return { ...blk, highlighted: html };
            }
          }
          return blk;
        })
      );

      setFormattedBlocks(final);
    };

    format();
  }, [output]);

  useEffect(() => {
    formattedBlocks.forEach((blk) => {
      if (blk.lang === "mermaid") {
        const el = document.getElementById(blk.id);
        if (el) {
          el.innerHTML = sanitizeMermaid(blk.content);
          try {
            mermaid.init(undefined, el);
          } catch (err) {
            el.innerHTML = "⚠️ Mermaid parse error";
            console.error(err);
          }
        }
      }
    });
  }, [formattedBlocks]);

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex items-center gap-2 px-3 pb-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
        <Terminal className="w-4 h-4 text-[#C9CDCF]" />
        <span>AI Explanation</span>
      </div>

      <div className="relative bg-[#0F0F0F] border border-[#26262a] rounded-lg p-4 h-64 overflow-y-auto text-sm leading-relaxed text-gray-300 shadow-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-900">
        {!output && (
          <p className="text-gray-500 italic">
            Your AI-generated explanation will appear here...
          </p>
        )}

        {formattedBlocks.map((blk, i) =>
          blk.type === "text" ? (
            <p key={i} className="mb-2">
              {blk.content}
            </p>
          ) : blk.lang === "mermaid" ? (
            <div key={i} id={blk.id} className="mermaid mb-4" />
          ) : (
            <div key={i} className="relative mb-4">
              <button
                onClick={() => copyToClipboard(blk.content)}
                className="absolute top-2 right-2 text-gray-400 hover:text-indigo-400 transition z-10"
              >
                <Copy className="w-4 h-4" />
              </button>
              <div
                className="overflow-x-auto rounded-lg border border-[#2a2a30]"
                dangerouslySetInnerHTML={{ __html: blk.highlighted }}
              />
            </div>
          )
        )}

        {output && (
          <div className="mt-3 p-2 bg-[#1b1b24] rounded text-xs text-gray-400 border border-[#26262a]">
            💡 Tip: Highlighting powered by Shiki & Mermaid — dev vibes max.
          </div>
        )}
      </div>
    </div>
  );
}
