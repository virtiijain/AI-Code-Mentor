"use client";

import { Menu, Code  } from "lucide-react";

export default function TopBar({ onMenuClick }) {
  return (
    <div className="w-full bg-[#11111b] border-b border-[#262626] px-4 h-14 flex items-center shadow-sm">
      <span className="text-indigo-400 font-semibold text-lg tracking-wide">
        AI CODE MENTOR
      </span>

      <div className="ml-auto flex items-center gap-5 text-gray-300">
        <Code className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <button className="md:hidden mr-3" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-gray-300 hover:text-white transition" />
        </button>
      </div>
    </div>
  );
}
