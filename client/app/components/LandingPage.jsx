import CodeEditor from "./CodeEditor";
import OutputBox from "./OutputBox";

export const LandingPage = ({ code, setCode, output, setIsEditorOpen }) => (
  <div className="min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 py-6 bg-[#0F0F0F] overflow-hidden">
    <header className="text-center max-w-xl sm:max-w-2xl px-2">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#57595B] to-[#D3DAD9] leading-tight">
        Decode your code smarter, faster & crystal clear.
      </h1>
      <p className="text-[#C9CDCF] text-sm sm:text-base md:text-lg mt-2">
        Paste your snippet and let the AI do its thing.
      </p>
      <button
        onClick={() => setIsEditorOpen(true)}
        className="mt-4 px-6 sm:px-8 py-2 rounded-md bg-gradient-to-r from-[#57595B] to-[#D3DAD9] text-black leading-tight hover:opacity-90 transition font-semibold uppercase text-xs lg:text-sm"
      >
        Start now
      </button>
    </header>

    <div className="flex-1 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center mt-6 sm:mt-10">
      <div className="bg-[#0e0e14] border border-[#57595B]/20 rounded-xl p-3 sm:p-4 h-60 sm:h-72 md:h-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col">
        <h3 className="text-xs sm:text-sm text-[#C9CDCF] mb-2 tracking-wide">
          Code Input
        </h3>
        <div className="flex-1 overflow-hidden rounded-lg">
          <CodeEditor code={code} setCode={setCode} />
        </div>
      </div>

      <div className="bg-[#0e0e14] border border-[#57595B]/20 rounded-xl p-3 sm:p-4 h-60 sm:h-72 md:h-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col">
        <h3 className="text-xs sm:text-sm text-[#C9CDCF] mb-2 tracking-wide">
          AI Output
        </h3>
        <div className="flex-1 overflow-auto rounded-lg">
          <OutputBox output={output} />
        </div>
      </div>
    </div>

    <footer className="text-[#C9CDCF] text-[10px] sm:text-xs tracking-wide opacity-70 mt-6">
      Thanks for stopping by — see you out there!
    </footer>
  </div>
);
