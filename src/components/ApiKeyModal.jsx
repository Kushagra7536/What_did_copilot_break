export default function ApiKeyModal({ apiKey, setApiKey, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border-2 border-[#1a1a1a] bg-white p-6 shadow-[8px_8px_0px_#1a1a1a] animate-fade-in-up">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 font-['Gloria_Hallelujah']">🔑 API Key</h2>
        <p className="text-xl text-gray-700 mb-6 font-['Caveat']">
          Your key is stored locally in your browser and sent only to Featherless AI.
        </p>
        <input
          id="api-key-input"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="fl-..."
          autoFocus
          className="w-full rounded-xl border-2 border-[#1a1a1a] bg-[#fafafa] px-4 py-3
                     text-base text-[#1a1a1a] placeholder-gray-400 font-mono
                     transition-all duration-200 shadow-[2px_2px_0px_#1a1a1a]
                     hover:shadow-[4px_4px_0px_#1a1a1a]
                     focus:shadow-[2px_2px_0px_#1a1a1a] focus:translate-x-[2px] focus:translate-y-[2px] focus:outline-none focus:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter" && apiKey.trim()) onClose();
          }}
        />
        <div className="mt-6 flex gap-3">
          <button
            id="save-key-btn"
            onClick={onClose}
            disabled={!apiKey.trim()}
            className="flex-1 rounded-xl border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-3 text-base font-bold text-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
                       transition-all hover:bg-[#2a2a2a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
          >
            Save & Continue
          </button>
        </div>
        <p className="mt-4 text-lg text-gray-600 font-['Caveat']">
          Get a key at{" "}
          <a
            href="https://featherless.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1a1a1a] hover:underline"
          >
            featherless.ai
          </a>
        </p>
      </div>
    </div>
  );
}
