"use client";

import { useState, useRef, useEffect } from "react";
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
  const [hovering, setHovering] = useState(false);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    let direction = 1;
    const interval = setInterval(() => {
      arrow.style.transform = `translateY(${direction * 5}px)`;
      direction *= -1;
    }, 500);

    return () => clearInterval(interval);
  }, []);

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

  const handleBugDetect = async () => {
    if (!code) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.bugs || "No bugs detected.");
    } catch (err) {
      console.error(err);
      setOutput("Error detecting bugs.");
    }

    setLoading(false);
  };

  const handleFlowchart = async () => {
    if (!code) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/flowchart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.flowchart || "No flowchart generated.");
    } catch (err) {
      console.error(err);
      setOutput("Error generating flowchart.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isEditorOpen ? (
        <div
          className="min-h-screen w-full flex flex-col items-center justify-between 
  px-4 sm:px-6 py-6 bg-gradient-to-b from-[#0d0d10] to-[#12121a] overflow-hidden"
        >
          <header className="text-center max-w-xl sm:max-w-2xl px-2">
            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text 
      bg-gradient-to-r from-[#7AE2CF] to-[#F5EEDD] leading-tight"
            >
              Decode your code smarter, faster & crystal clear.
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-2">
              Paste your snippet and let the AI do its thing.
            </p>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="mt-4 px-6 sm:px-8 py-2 rounded-lg 
      bg-[#7AE2CF] text-black
      hover:opacity-90 transition font-semibold 
      shadow-[0_0_20px_rgba(122,226,207,0.35)] 
      tracking-wider uppercase text-xs sm:text-sm"
            >
              Start now
            </button>
          </header>
          <div className="flex-1 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center mt-6 sm:mt-10">
            <div
              className="bg-[#0e0e14] border border-[#7AE2CF]/20 rounded-xl p-3 sm:p-4 
      h-60 sm:h-72 md:h-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <h3 className="text-xs sm:text-sm text-[#7AE2CF] mb-2 tracking-wide">
                Code Input
              </h3>
              <div className="flex-1 overflow-hidden rounded-lg">
                <CodeEditor code={code} setCode={setCode} />
              </div>
            </div>
            <div
              className="bg-[#0e0e14] border border-[#7AE2CF]/20 rounded-xl p-3 sm:p-4 
      h-60 sm:h-72 md:h-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <h3 className="text-xs sm:text-sm text-[#F5EEDD] mb-2 tracking-wide">
                AI Output
              </h3>

              <div className="flex-1 overflow-auto rounded-lg">
                <OutputBox output={output} />
              </div>
            </div>
          </div>
          <footer className="text-[#7AE2CF] text-[10px] sm:text-xs tracking-wide opacity-70 mt-6">
            Thanks for stopping by — see you out there!
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
                onClick={
                  mode === "explain"
                    ? handleExplain
                    : mode === "optimize"
                    ? handleOptimize
                    : mode === "bug"
                    ? handleBugDetect
                    : handleFlowchart
                }
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-sm font-medium transition"
              >
                {loading
                  ? "Generating..."
                  : mode === "explain"
                  ? "Explain Code"
                  : mode === "optimize"
                  ? "Optimize Code"
                  : mode === "bug"
                  ? "Detect Bugs"
                  : "Generate Flowchart"}
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
