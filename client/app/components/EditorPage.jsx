import TopBar from "./TopBar";
import SideBar from "./SideBar";
import CodeEditor from "./CodeEditor";
import OutputBox from "./OutputBox";

export const EditorPage = ({
  code,
  setCode,
  mode,
  setMode,
  output,
  loading,
  callApi,
}) => {
  const handleClick = () => {
    const map = {
      explain: "explain",
      optimize: "optimize",
      bug: "bug",
      flowchart: "flowchart",
    };
    callApi(map[mode], code);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0f]">
      <TopBar onMenuClick={() => setMode(true)} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar
          isOpen={mode}
          onClose={() => setMode(false)}
          onModeChange={(val) => setMode(val)}
        />
        <div className="flex-1 p-6 overflow-y-auto bg-[#0d0d0f]">
          <CodeEditor code={code} setCode={setCode} />
          <button
            onClick={handleClick}
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-[#57595B] to-[#D3DAD9] text-black px-6 py-2 rounded-md text-sm font-medium transition"
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

          <OutputBox output={output} />
        </div>
      </div>
    </div>
  );
};
