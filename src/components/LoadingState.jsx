export default function LoadingState() {
  const quips = [
    "Reviewing the damage…",
    "Checking what Copilot did this time…",
    "Counting the broken tests…",
    "Analyzing the blast radius…",
    "Reading the diff so you don't have to…",
  ];
  const quip = quips[Math.floor(Math.random() * quips.length)];

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
      {/* Bouncing dots */}
      <div className="relative flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-accent-500"
            style={{
              animation: `bounce-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
        {/* Glow behind dots */}
        <div className="absolute inset-0 blur-xl opacity-50">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-accent-500/60"
                style={{
                  animation: `bounce-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <p className="text-sm font-medium text-gray-300">{quip}</p>
        <p className="text-xs text-gray-600">This usually takes 3-5 seconds</p>
      </div>

      {/* Skeleton lines */}
      <div className="w-full max-w-xs space-y-2.5 opacity-60">
        {[1, 0.7, 0.85, 0.55].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full animate-shimmer"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
