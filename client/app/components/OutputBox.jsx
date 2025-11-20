"use client";

import { Terminal, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { highlightCode } from "../lib/shiki";
import mermaid from "mermaid";

export default function OutputBox({ output }) {
  const [formattedBlocks, setFormattedBlocks] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

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
        if (inCode) {
          currentCode.push(line);
        } else {
          if (line.trim() !== "") {
            blocks.push({ type: "text", content: line });
          }
        }
      }
    });

    return blocks;
  };

  useEffect(() => {
    const formatBlocks = async () => {
      if (!output) {
        setFormattedBlocks([]);
        return;
      }

      const rawBlocks = extractBlocks(output);
      const formatted = await Promise.all(
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

      setFormattedBlocks(formatted);
    };

    formatBlocks();
  }, [output]);

  useEffect(() => {
    formattedBlocks.forEach((blk, i) => {
      if (blk.lang === "mermaid") {
        const el = document.getElementById(`mermaid-${i}`);
        if (el) {
          el.innerHTML = sanitizeMermaid(blk.content);
          try {
            mermaid.init(undefined, el);
          } catch (err) {
            el.innerHTML = "⚠️ Mermaid parse error";
          }
        }
      }
    });
  }, [formattedBlocks]);

  const toggleSpeak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = formattedBlocks
        .filter((blk) => blk.type === "text")
        .map((blk) => blk.content)
        .join(". ");

      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex items-center justify-between px-3 pb-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#C9CDCF]" />
          <span>Decoded by AI</span>
        </div>

        {formattedBlocks.some((blk) => blk.type === "text") && (
          <button
            onClick={toggleSpeak}
            className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium"
          >
            <Volume2 className="w-4 h-4" />
            {isSpeaking ? "Stop Listening" : "Listen"}
          </button>
        )}
      </div>

      <div className="relative bg-[#0F0F0F] border border-[#26262a] rounded-lg p-4 h-64 overflow-y-auto text-sm leading-relaxed text-gray-300 shadow-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-900">
        {!output && (
          <p className="text-gray-500 italic">
            Paste some code above and click a mode to see results.
          </p>
        )}

        {formattedBlocks.map((blk, i) => {
          if (blk.type === "text") {
            return (
              <p key={i} className="mb-2">
                {blk.content}
              </p>
            );
          } else if (blk.lang === "mermaid") {
            return <div key={i} id={`mermaid-${i}`} className="mermaid mb-4" />;
          } else {
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-lg border border-[#2a2a30] mb-4 p-2 bg-[#1a1a1f]"
                dangerouslySetInnerHTML={{ __html: blk.highlighted }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
