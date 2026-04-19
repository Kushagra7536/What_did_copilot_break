export default function DiffInput({
  mode,
  setMode,
  before,
  setBefore,
  after,
  setAfter,
  unifiedDiff,
  setUnifiedDiff,
  isLoading,
}) {
  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-surface-600/60 bg-surface-800/60 p-0.5">
          <button
            type="button"
            onClick={() => setMode("split")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200
              ${mode === "split"
                ? "bg-accent-600/20 text-accent-400 shadow-sm"
                : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setMode("unified")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200
              ${mode === "unified"
                ? "bg-accent-600/20 text-accent-400 shadow-sm"
                : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Unified Diff
          </button>
        </div>
        <span className="text-[11px] text-gray-600">
          {mode === "split" ? "Paste before & after code" : "Paste a unified diff"}
        </span>
      </div>

      {mode === "split" ? (
        /* ── Split Mode ── */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Before */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
              <label
                htmlFor="before-code"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Before
              </label>
            </div>
            <textarea
              id="before-code"
              value={before}
              onChange={(e) => setBefore(e.target.value)}
              placeholder={"// Paste the original code here\nfunction greet(name) {\n  return 'Hello ' + name;\n}"}
              rows={14}
              disabled={isLoading}
              className="code-textarea border-surface-600/40"
              spellCheck={false}
            />
          </div>

          {/* After */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              <label
                htmlFor="after-code"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                After
              </label>
            </div>
            <textarea
              id="after-code"
              value={after}
              onChange={(e) => setAfter(e.target.value)}
              placeholder={"// Paste the modified code here\nfunction greet(name = 'World') {\n  return `Hello ${name}!`;\n}"}
              rows={14}
              disabled={isLoading}
              className="code-textarea border-surface-600/40"
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        /* ── Unified Mode ── */
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-accent-400/60" />
            <label
              htmlFor="unified-diff"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400"
            >
              Unified Diff
            </label>
          </div>
          <textarea
            id="unified-diff"
            value={unifiedDiff}
            onChange={(e) => setUnifiedDiff(e.target.value)}
            placeholder={"- function greet(name) {\n-   return 'Hello ' + name;\n- }\n+ function greet(name = 'World') {\n+   return `Hello ${name}!`;\n+ }"}
            rows={16}
            disabled={isLoading}
            className="code-textarea border-surface-600/40"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
