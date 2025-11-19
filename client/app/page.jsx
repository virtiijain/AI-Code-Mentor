"use client";

import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { EditorPage } from "./components/EditorPage";
import { useCodeActions } from "./hooks/useCodeActions";

export default function Home() {
  const [code, setCode] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [mode, setMode] = useState("explain");
  const { output, loading, error, callApi } = useCodeActions();

  return (
    <div className="min-h-screen text-white">
      {!isEditorOpen ? (
        <LandingPage code={code} setCode={setCode} output={output} setIsEditorOpen={setIsEditorOpen} />
      ) : (
        <EditorPage code={code} setCode={setCode} mode={mode} setMode={setMode} output={output} loading={loading} callApi={callApi} />
      )}
    </div>
  );
}
