import { useState, useCallback } from "react";
import DiffInput from "./components/DiffInput";
import ResultsPanel from "./components/ResultsPanel";
import LoadingState from "./components/LoadingState";
import ApiKeyModal from "./components/ApiKeyModal";
import { analyzeDiff } from "./api";

export default function App() {
  // API key: env var → localStorage → empty
  const [apiKey, setApiKey] = useState(
    () =>
      import.meta.env.VITE_FEATHERLESS_API_KEY ||
      localStorage.getItem("wdcb_api_key") ||
      ""
  );
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Input state
  const [mode, setMode] = useState("split"); // "split" | "unified"
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [unifiedDiff, setUnifiedDiff] = useState("");

  // App state
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const hasInput =
    mode === "split"
      ? before.trim() || after.trim()
      : unifiedDiff.trim();

  const handleAnalyze = useCallback(async () => {
    if (!apiKey.trim()) {
      setShowKeyModal(true);
      return;
    }
    if (!hasInput) return;

    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const data = await analyzeDiff(
        { before, after, unifiedDiff, mode },
        apiKey.trim()
      );
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  }, [apiKey, before, after, unifiedDiff, mode, hasInput]);

  const handleReset = () => {
    setStatus("idle");
    setResult(null);
    setError("");
  };

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("wdcb_api_key", apiKey.trim());
    }
    setShowKeyModal(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-[#0a0a0a]">
      {/* ── Background FX ── */}
      <div className="fixed inset-0 -z-10 bg-[#fafafa]">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(#e5e5e5 1px, transparent 1px),
                              linear-gradient(90deg, #e5e5e5 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b-2 border-[#1a1a1a] bg-[#fafafa]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#1a1a1a] bg-white text-lg font-bold text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] font-['Gloria_Hallelujah']">
              ?!
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1a1a1a] tracking-tight leading-none font-['Inter']">
                What Did Copilot Break?
              </h1>
              <p className="text-[12px] text-gray-600 mt-1 font-['Caveat'] text-lg leading-none">
                AI-powered diff explainer
              </p>
            </div>
          </div>
          <button
            id="api-key-btn"
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-1.5 rounded-lg border-2 border-[#1a1a1a] bg-white px-3 py-1.5
                       text-sm font-semibold text-[#1a1a1a] transition-all shadow-[2px_2px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            {apiKey ? "Key set" : "Set API key"}
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Show input + button when idle or error */}
        {(status === "idle" || status === "error") && (
          <div className="animate-fade-in-up">
            {/* Empty-state hero */}
            {status === "idle" && !hasInput && (
              <div className="mb-10 text-center">
                <p className="text-5xl mb-4 grayscale">🔍</p>
                <h2 className="text-4xl font-extrabold text-[#1a1a1a] sm:text-5xl tracking-tight font-['Gloria_Hallelujah']">
                  Paste a diff. Get answers.
                </h2>
                <p className="mt-4 text-xl text-gray-700 max-w-xl mx-auto font-['Caveat']">
                  Drop in your before &amp; after code (or a unified diff) and let
                  Claude explain what changed, what could break, and what to test.
                </p>
              </div>
            )}

            {/* Input area */}
            <div className="rounded-2xl border-2 border-[#1a1a1a] bg-white p-5 sm:p-6 shadow-[6px_6px_0px_#1a1a1a]">
              <DiffInput
                mode={mode}
                setMode={setMode}
                before={before}
                setBefore={setBefore}
                after={after}
                setAfter={setAfter}
                unifiedDiff={unifiedDiff}
                setUnifiedDiff={setUnifiedDiff}
                isLoading={false}
              />

              {/* Submit button */}
              <div className="mt-6">
                <button
                  id="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={!hasInput}
                  className="group w-full rounded-xl bg-[#1a1a1a] border-2 border-[#1a1a1a]
                             px-6 py-4 font-bold text-white text-lg
                             transition-all duration-200
                             hover:bg-[#2a2a2a]
                             shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
                             active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                             disabled:opacity-40 disabled:cursor-not-allowed
                             disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:shadow-none"
                >
                  <span className="flex items-center justify-center gap-2 font-['Inter']">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Explain the Diff
                  </span>
                </button>
              </div>
            </div>

            {/* Error message */}
            {status === "error" && error && (
              <div className="mt-6 rounded-xl border-2 border-red-500 bg-red-50 px-5 py-4 animate-fade-in-up shadow-[4px_4px_0px_#ef4444]">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💥</span>
                  <div>
                    <p className="text-base font-bold text-red-700">
                      Something went wrong
                    </p>
                    <p className="mt-1 text-sm text-red-600 font-mono break-all">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {status === "loading" && <LoadingState />}

        {/* Results */}
        {status === "done" && result && (
          <ResultsPanel result={result} onReset={handleReset} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-12 pb-8 text-center">
        <p className="text-lg text-gray-600 font-['Caveat']">
          Paste code → AI reviews → ship with confidence · Powered by{" "}
          <span className="font-bold text-[#1a1a1a]">Featherless AI</span>
        </p>
      </footer>

      {/* ── API Key Modal ── */}
      {showKeyModal && (
        <ApiKeyModal
          apiKey={apiKey}
          setApiKey={setApiKey}
          onClose={handleSaveKey}
        />
      )}
    </div>
  );
}
