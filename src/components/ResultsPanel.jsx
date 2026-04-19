import { useState } from "react";

const SEVERITY_CONFIG = {
  safe: {
    label: "✅ Safe",
    color: "text-green-800",
    bg: "bg-green-100",
    border: "border-[#1a1a1a]",
    description: "Low risk — looks like a clean change",
  },
  risky: {
    label: "🟡 Risky",
    color: "text-yellow-800",
    bg: "bg-yellow-100",
    border: "border-[#1a1a1a]",
    description: "Medium risk — review carefully before merging",
  },
  yikes: {
    label: "🚨 Yikes",
    color: "text-red-800",
    bg: "bg-red-100",
    border: "border-[#1a1a1a]",
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
    <div className="space-y-6 stagger">
      {/* ── Severity Badge ── */}
      <div className="animate-fade-in-up">
        <div
          className={`rounded-2xl border-2 ${severity.border} ${severity.bg} p-5 shadow-[4px_4px_0px_#1a1a1a] transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${severity.color} font-['Gloria_Hallelujah']`}>
                {severity.label}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-700 font-['Caveat'] text-xl">{severity.description}</span>
          </div>
        </div>
      </div>

      {/* ── Summary ── */}
      <SectionCard
        icon="📝"
        title="What Changed"
        bgClass="bg-blue-50"
      >
        <p className="text-base text-[#1a1a1a] leading-relaxed font-['Inter']">{result.summary}</p>
      </SectionCard>

      {/* ── Risks ── */}
      <SectionCard
        icon="💥"
        title="What Could Break"
        bgClass="bg-orange-50"
      >
        {result.risks?.length > 0 ? (
          <ul className="space-y-3">
            {result.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-sm font-bold text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]">
                  {i + 1}
                </span>
                <span className="text-base text-[#1a1a1a] leading-relaxed font-['Inter']">
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-gray-500 italic font-['Caveat'] text-xl">
            No significant risks identified.
          </p>
        )}
      </SectionCard>

      {/* ── Test Cases ── */}
      <SectionCard
        icon="✅"
        title="What to Test"
        bgClass="bg-green-50"
      >
        {result.test_cases?.length > 0 ? (
          <ul className="space-y-3">
            {result.test_cases.map((tc, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#1a1a1a] bg-white shadow-[2px_2px_0px_#1a1a1a]">
                  <svg
                    className="h-3 w-3 text-[#1a1a1a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-base text-[#1a1a1a] leading-relaxed font-['Inter']">
                  {tc}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-gray-500 italic font-['Caveat'] text-xl">No specific test cases.</p>
        )}
      </SectionCard>

      {/* ── Actions ── */}
      <div className="flex gap-4 pt-2 animate-fade-in-up">
        <button
          id="reset-btn"
          onClick={onReset}
          className="flex-1 rounded-xl border-2 border-[#1a1a1a] bg-white px-5 py-4
                     text-base font-bold text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a]
                     transition-all duration-200
                     hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a]
                     active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          ← Analyze Another Diff
        </button>
        <button
          id="copy-report-btn"
          onClick={handleCopy}
          className={`flex-1 rounded-xl border-2 border-[#1a1a1a] px-5 py-4 text-base font-bold shadow-[4px_4px_0px_#1a1a1a]
                     transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                     hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a1a1a]
                     ${copied
                       ? "bg-green-100 text-green-900"
                       : "bg-[#1a1a1a] text-white"
                     }`}
        >
          {copied ? "✓ Copied!" : "📋 Copy Report"}
        </button>
      </div>
    </div>
  );
}

function SectionCard({ icon, title, bgClass, children }) {
  return (
    <div
      className={`animate-fade-in-up rounded-2xl border-2 border-[#1a1a1a] ${bgClass} p-6 transition-all duration-300 shadow-[6px_6px_0px_#1a1a1a]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl grayscale">{icon}</span>
        <h3 className="text-xl font-bold uppercase tracking-wider text-[#1a1a1a] font-['Gloria_Hallelujah']">
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
