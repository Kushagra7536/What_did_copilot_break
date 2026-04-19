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
      <div className="relative flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-4 w-4 rounded-full border-2 border-[#1a1a1a] bg-white shadow-[2px_2px_0px_#1a1a1a]"
            style={{
              animation: `bounce-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-2xl font-bold text-[#1a1a1a] font-['Gloria_Hallelujah']">{quip}</p>
        <p className="text-xl text-gray-600 font-['Caveat']">This usually takes 3-5 seconds</p>
      </div>

      {/* Skeleton lines */}
      <div className="w-full max-w-xs space-y-3 opacity-80">
        {[1, 0.7, 0.85, 0.55].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full border border-dashed border-gray-400 bg-gray-100"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
