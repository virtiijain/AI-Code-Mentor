"use client";

import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import CodeEditor from "./components/CodeEditor";
import OutputBox from "./components/OutputBox.jsx";

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("explain");

  const handleExplain = async () => {
    if (!code) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log("API response:", data);
      setOutput(data.explanation || "No explanation returned.");
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleOptimize = async () => {
    if (!code) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.optimized || "No optimized result returned.");
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong while optimizing.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isEditorOpen ? (
        <div className="flex flex-col items-center px-6 py-12 min-h-screen">
          <header className="text-center max-w-3xl mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
              Explain your code instantly
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-6">
              Paste a snippet below and see how AI explains it in real-time.
            </p>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium transition shadow-lg"
            >
              Try it Now
            </button>
          </header>

          <div className="w-full max-w-4xl bg-[#1b1b25] rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col">
              <div className="bg-[#0f0f11] border border-[#2a2a2a] rounded-lg p-4 flex-1">
                <CodeEditor code={code} setCode={setCode} />
              </div>
            </div>
            <div className="flex-1 bg-[#0f0f11] border border-[#2a2a2a] rounded-lg p-4 h-full overflow-y-auto shadow-inner">
              <OutputBox output={output} />
            </div>
          </div>

          <footer className="mt-12 text-gray-500 text-sm">
            Made with 💜 by AI Code Mentor
          </footer>
        </div>
      ) : (
        <div className="h-screen flex flex-col bg-[#0d0d0f]">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex flex-1 overflow-hidden">
            <SideBar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onModeChange={(val) => setMode(val)}
            />
            <div className="flex-1 p-6 overflow-y-auto bg-[#0d0d0f]">
              <CodeEditor code={code} setCode={setCode} />
              <button
                onClick={mode === "explain" ? handleExplain : handleOptimize}
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-sm font-medium transition"
              >
                {loading
                  ? "Generating..."
                  : mode === "explain"
                  ? "Explain Code"
                  : "Optimize Code"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <OutputBox output={output} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
