import LightRays from "./LightRays";
import CodeEditor from "./CodeEditor";
import OutputBox from "./OutputBox";

export const LandingPage = ({ code, setCode, output, setIsEditorOpen }) => (
  <div className="relative min-h-screen w-full overflow-hidden bg-[#0F0F0F]">
    <div className="absolute inset-0 z-0">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={0.9}
        rayLength={2.2}
        followMouse={true}
        mouseInfluence={0.2}
        noiseAmount={0.3}
        distortion={0.05}
      />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-6 w-full min-h-screen">
      <header className="text-center max-w-xl sm:max-w-2xl px-2 relative z-10 mb-8">
        <h1 className="text-2xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#585b5d] via-[#afafaf] via-50% to-[#d5dddc] leading-snug">
          Decode your code smarter, faster & crystal clear.
        </h1>
        <p className="text-gray-400 text-sm lg:text-base mt-3">
          Paste your snippet and let the AI do its thing. click{" "}
          <span className="text-white font-medium animate-pulse uppercase">
            Start now
          </span>{" "}
          to begin!
        </p>
        <button
          onClick={() => setIsEditorOpen(true)}
          className="mt-3 px-6 py-2 rounded-md border border-gray-400 text-gray-300 font-normal uppercase text-xs tracking-wide"
        >
          Start now
        </button>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
        <div className="rounded-lg overflow-hidden h-60 sm:h-72 md:h-80">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <div className="bg-[#1A1A1D] border border-[#57595B]/20 rounded-xl p-2  h-60 sm:h-72 md:h-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="flex-1 overflow-auto rounded-lg">
            <OutputBox output={output} />
          </div>
        </div>
      </div>
    </div>

    <footer className="absolute bottom-0 left-0 w-full text-center text-[#C9CDCF] text-[10px] sm:text-xs tracking-wide opacity-70 py-1 lg:py-4 z-10">
     &copy; 2025 AI Code Mentor | all rights reserved.
    </footer>
  </div>
);
