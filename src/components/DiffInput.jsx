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
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg border-2 border-[#1a1a1a] bg-white p-1 shadow-[2px_2px_0px_#1a1a1a]">
          <button
            type="button"
            onClick={() => setMode("split")}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-all duration-200
              ${mode === "split"
                ? "bg-[#1a1a1a] text-white"
                : "text-gray-600 hover:text-[#1a1a1a] hover:bg-gray-100"
              }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setMode("unified")}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-all duration-200
              ${mode === "unified"
                ? "bg-[#1a1a1a] text-white"
                : "text-gray-600 hover:text-[#1a1a1a] hover:bg-gray-100"
              }`}
          >
            Unified Diff
          </button>
        </div>
        <span className="text-lg text-gray-600 font-['Caveat']">
          {mode === "split" ? "Paste before & after code" : "Paste a unified diff"}
        </span>
      </div>

      {mode === "split" ? (
        /* ── Split Mode ── */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Before */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-red-400" />
              <label
                htmlFor="before-code"
                className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] font-['Gloria_Hallelujah']"
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
              className="code-textarea"
              spellCheck={false}
            />
          </div>

          {/* After */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-green-400" />
              <label
                htmlFor="after-code"
                className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] font-['Gloria_Hallelujah']"
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
              className="code-textarea"
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        /* ── Unified Mode ── */
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-[#1a1a1a] bg-blue-400" />
            <label
              htmlFor="unified-diff"
              className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] font-['Gloria_Hallelujah']"
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
            className="code-textarea"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
