"use client";

import { Upload, Sparkles, X, Bug, Lightbulb } from "lucide-react";

export default function SideBar({ isOpen, onClose, onModeChange }) {
  const item =
    "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#1a1a1d] cursor-pointer transition";

  return (
    <>
      {/* ------------------ DESKTOP SIDEBAR ------------------ */}
      <div className="hidden md:flex w-52 bg-[#0f0f12] border-r border-[#262626] flex-col py-5">
        <h2 className="px-4 pb-2 text-[11px] text-gray-500 tracking-wider uppercase">
          Workspace
        </h2>

        <div className={item} onClick={() => onModeChange("optimize")}>
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-sm text-gray-200">Optimizer Mode</span>
        </div>

        <div className={item} onClick={() => onModeChange("bug")}>
          <Bug className="w-5 h-5 text-indigo-400" />{" "}
          <span className="text-sm text-gray-200">Bug Detector</span>
        </div>

        <div className={item} onClick={() => onModeChange("flowchart")}>
          <Lightbulb className="w-5 h-5 text-indigo-400" />
          <span className="text-sm text-gray-200">Flowchart Mode</span>
        </div>

        <div className={item} onClick={() => onModeChange("testcase")}>
          <Upload className="w-5 h-5 text-indigo-400" />
          <span className="text-sm text-gray-200">Generate Test Cases</span>
        </div>
      </div>

      {/* ------------------ MOBILE BACKDROP ------------------ */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* ------------------ MOBILE SLIDE SIDEBAR ------------------ */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[#0f0f12] border-r border-[#262626] transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-[#262626]">
          <h2 className="text-[11px] text-gray-500 tracking-wider uppercase">
            Workspace
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-300 hover:text-white transition" />
          </button>
        </div>

        <div className="flex flex-col py-4">
          <div className={item} onClick={() => onModeChange("optimize")}>
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-gray-200">Optimizer Mode</span>
          </div>

          <div className={item} onClick={() => onModeChange("bug")}>
            <Bug className="w-5 h-5 text-indigo-400" />{" "}
            <span className="text-sm text-gray-200">Bug Detector</span>
          </div>

          <div className={item} onClick={() => onModeChange("flowchart")}>
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-gray-200">Flowchart Mode</span>
          </div>

          <div className={item} onClick={() => onModeChange("testcase")}>
            <Upload className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-gray-200">Generate Test Cases</span>
          </div>
        </div>
      </div>
    </>
  );
}
