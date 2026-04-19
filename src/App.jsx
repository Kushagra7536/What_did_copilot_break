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
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Background FX ── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-accent-600/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.04] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-surface-600/40 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20">
              ?!
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-none">
                What Did Copilot Break?
              </h1>
              <p className="text-[10px] text-gray-500 mt-0.5">
                AI-powered diff explainer
              </p>
            </div>
          </div>
          <button
            id="api-key-btn"
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-surface-500/50 bg-surface-800/80 px-3 py-1.5
                       text-xs text-gray-400 transition-all hover:border-accent-500/30 hover:text-gray-300"
          >
            <svg
              className="h-3.5 w-3.5"
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
              <div className="mb-8 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
                  Paste a diff.{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                    Get answers.
                  </span>
                </h2>
                <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
                  Drop in your before &amp; after code (or a unified diff) and let
                  Claude explain what changed, what could break, and what to test.
                </p>
              </div>
            )}

            {/* Input area */}
            <div className="rounded-2xl border border-surface-600/40 bg-surface-800/30 p-5 sm:p-6 backdrop-blur-sm">
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
              <div className="mt-5">
                <button
                  id="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={!hasInput}
                  className="group w-full rounded-xl bg-gradient-to-r from-orange-500 to-rose-500
                             px-6 py-3.5 font-semibold text-white
                             transition-all duration-200
                             hover:from-orange-400 hover:to-rose-400
                             hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]
                             active:scale-[0.98]
                             disabled:opacity-30 disabled:cursor-not-allowed
                             disabled:hover:shadow-none"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
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
              <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 animate-fade-in-up">
                <div className="flex items-start gap-2">
                  <span className="text-base">💥</span>
                  <div>
                    <p className="text-sm font-medium text-rose-400">
                      Something went wrong
                    </p>
                    <p className="mt-1 text-xs text-rose-300/70 font-mono break-all">
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
      <footer className="mt-10 pb-8 text-center">
        <p className="text-[11px] text-gray-600">
          Paste code → AI reviews → ship with confidence · Powered by{" "}
          <span className="text-gray-500">Featherless AI</span>
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
