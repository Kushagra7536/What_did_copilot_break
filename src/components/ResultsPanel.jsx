import { useState } from "react";

const SEVERITY_CONFIG = {
  safe: {
    label: "✅ Safe",
    color: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/25",
    glow: "severity-safe",
    description: "Low risk — looks like a clean change",
  },
  risky: {
    label: "🟡 Risky",
    color: "text-risky",
    bg: "bg-risky/10",
    border: "border-risky/25",
    glow: "severity-risky",
    description: "Medium risk — review carefully before merging",
  },
  yikes: {
    label: "🚨 Yikes",
    color: "text-yikes",
    bg: "bg-yikes/10",
    border: "border-yikes/25",
    glow: "severity-yikes",
    description: "High risk — this could break things",
  },
};

export default function ResultsPanel({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const severity = SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG.risky;

  const handleCopy = () => {
    const md = formatAsMarkdown(result);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-5 stagger">
      {/* ── Severity Badge ── */}
      <div className="animate-fade-in-up">
        <div
          className={`rounded-2xl border ${severity.border} ${severity.bg} p-5 ${severity.glow} transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${severity.color}`}>
                {severity.label}
              </span>
            </div>
            <span className="text-xs text-gray-500">{severity.description}</span>
          </div>
        </div>
      </div>

      {/* ── Summary ── */}
      <SectionCard
        icon="📝"
        title="What Changed"
        accentColor="blue"
        borderClass="border-blue-400/15"
        bgClass="from-blue-400/5"
      >
        <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
      </SectionCard>

      {/* ── Risks ── */}
      <SectionCard
        icon="💥"
        title="What Could Break"
        accentColor="orange"
        borderClass="border-orange-400/15"
        bgClass="from-orange-400/5"
      >
        {result.risks?.length > 0 ? (
          <ul className="space-y-2.5">
            {result.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-400/10 text-[10px] font-bold text-orange-400 border border-orange-400/20 group-hover:bg-orange-400/20 transition-colors">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No significant risks identified.
          </p>
        )}
      </SectionCard>

      {/* ── Test Cases ── */}
      <SectionCard
        icon="✅"
        title="What to Test"
        accentColor="emerald"
        borderClass="border-emerald-400/15"
        bgClass="from-emerald-400/5"
      >
        {result.test_cases?.length > 0 ? (
          <ul className="space-y-2.5">
            {result.test_cases.map((tc, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-400/30 bg-emerald-400/5 group-hover:bg-emerald-400/15 transition-colors">
                  <svg
                    className="h-2.5 w-2.5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">
                  {tc}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No specific test cases.</p>
        )}
      </SectionCard>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-1 animate-fade-in-up">
        <button
          id="reset-btn"
          onClick={onReset}
          className="flex-1 rounded-xl border border-surface-500/50 bg-surface-800/80 px-4 py-3
                     text-sm font-medium text-gray-300
                     transition-all duration-200
                     hover:border-accent-500/30 hover:bg-surface-700/80 hover:text-white
                     active:scale-[0.98]"
        >
          ← Analyze Another Diff
        </button>
        <button
          id="copy-report-btn"
          onClick={handleCopy}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium
                     transition-all duration-200 active:scale-[0.98]
                     ${copied
                       ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                       : "border-accent-500/30 bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 hover:text-accent-300"
                     }`}
        >
          {copied ? "✓ Copied!" : "📋 Copy Report"}
        </button>
      </div>
    </div>
  );
}

function SectionCard({ icon, title, borderClass, bgClass, children }) {
  return (
    <div
      className={`animate-fade-in-up rounded-2xl border ${borderClass} bg-gradient-to-br ${bgClass} to-surface-800/80 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/10`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function formatAsMarkdown(result) {
  const sev = result.severity === "yikes" ? "🚨 YIKES" : result.severity === "risky" ? "🟡 RISKY" : "✅ SAFE";
  return `## What Did Copilot Break?

**Severity:** ${sev}

### 📝 What Changed
${result.summary}

### 💥 What Could Break
${result.risks?.map((r) => `- ${r}`).join("\n") || "Nothing significant."}

### ✅ What to Test
${result.test_cases?.map((t) => `- [ ] ${t}`).join("\n") || "No specific tests."}

---
*Generated by What Did Copilot Break?*`;
}
