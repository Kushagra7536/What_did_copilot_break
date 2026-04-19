export default function ApiKeyModal({ apiKey, setApiKey, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-surface-500/50 bg-surface-800 p-6 shadow-2xl animate-fade-in-up">
        <h2 className="text-lg font-semibold text-white mb-1">🔑 API Key</h2>
        <p className="text-sm text-gray-400 mb-4">
          Your key is stored locally in your browser and sent only to Featherless AI.
        </p>
        <input
          id="api-key-input"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="fl-..."
          autoFocus
          className="w-full rounded-xl border border-surface-500/50 bg-surface-900/80 px-4 py-3
                     text-sm text-gray-100 placeholder-gray-500 font-mono
                     transition-all duration-200
                     hover:border-accent-500/30
                     focus:border-accent-500/50 focus:bg-surface-900 focus:outline-none focus:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter" && apiKey.trim()) onClose();
          }}
        />
        <div className="mt-4 flex gap-3">
          <button
            id="save-key-btn"
            onClick={onClose}
            disabled={!apiKey.trim()}
            className="flex-1 rounded-xl bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white
                       transition-all hover:bg-accent-500 active:scale-[0.98]
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save & Continue
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Get a key at{" "}
          <a
            href="https://featherless.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-400 hover:underline"
          >
            featherless.ai
          </a>
        </p>
      </div>
    </div>
  );
}
