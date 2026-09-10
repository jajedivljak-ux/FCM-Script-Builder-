import { useState } from "react";
import {
  AD_MODES, AWARENESS_STAGES, SOPHISTICATION_LEVELS,
  FRAMEWORKS, CTA_OPTIONS, FRAMEWORKS_BY_MODE, RECOMMENDED,
  buildPrompt
} from "../lib/data";

// ─── SHARED UI (outside component to prevent mobile remount bug) ──────────────
const PageWrap = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#f0ede8", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: 60 }}>
    {children}
  </div>
);
const TopBar = ({ title, onBack, right }) => (
  <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Back</button>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{title}</div>
    <div style={{ fontSize: 11, color: "#444", minWidth: 50, textAlign: "right" }}>{right || ""}</div>
  </div>
);
const Eyebrow = ({ text }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "#e8500a", textTransform: "uppercase", marginBottom: 8 }}>{text}</div>
);
const PrimaryBtn = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: "16px",
    background: disabled ? "#1a1a1a" : "linear-gradient(135deg, #e8500a, #c43a00)",
    border: "none", color: disabled ? "#444" : "#fff",
    borderRadius: 10, fontSize: 15, fontWeight: 700,
    cursor: disabled ? "default" : "pointer", letterSpacing: "-0.2px", transition: "all 0.2s"
  }}>{children}</button>
);
const GhostBtn = ({ onClick, children, style }) => (
  <button onClick={onClick} style={{
    width: "100%", padding: "14px", background: "#111",
    border: "1px solid #1e1e1e", color: "#888", borderRadius: 10,
    fontSize: 13, fontWeight: 600, cursor: "pointer", ...style
  }}>{children}</button>
);

export default function AdScriptBuilder() {
  const [view, setView] = useState("mode");
  const [adMode, setAdMode] = useState(null);
  const [awarenessStage, setAwarenessStage] = useState(null);
  const [sophistication, setSophistication] = useState(null);
  const [dominantEmotion, setDominantEmotion] = useState("");
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generatedScript, setGeneratedScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState(null);

  const mode = adMode ? AD_MODES[adMode] : null;
  const stage = awarenessStage ? AWARENESS_STAGES.find(s => s.id === awarenessStage) : null;
  const soph = sophistication ? SOPHISTICATION_LEVELS.find(s => s.id === sophistication) : null;
  const framework = selectedFramework ? FRAMEWORKS[selectedFramework] : null;
  const steps = framework?.steps || [];
  const step = steps[currentStep];

  function reset() {
    setView("mode"); setAdMode(null); setAwarenessStage(null);
    setSophistication(null); setDominantEmotion(""); setSelectedFramework(null);
    setCurrentStep(0); setAnswers({}); setGeneratedScript(""); setApiError(null);
  }
  function startBuild(fwId) {
    setSelectedFramework(fwId); setCurrentStep(0); setAnswers({});
    setGeneratedScript(""); setApiError(null); setView("build");
  }
  function handleNext() {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    else generateScript();
  }
  function handleBack() {
    if (currentStep > 0) setCurrentStep(c => c - 1);
    else setView("framework");
  }

  async function generateScript() {
    setLoading(true); setApiError(null); setView("result");
    const fw = FRAMEWORKS[selectedFramework];
    const prompt = buildPrompt({ mode, stage, soph, dominantEmotion, fw, answers });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
      if (!data.script) throw new Error("Empty response. Please try again.");
      setGeneratedScript(data.script);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      setGeneratedScript("");
    }
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  // ── MODE ──────────────────────────────────────────────────────────────────
  if (view === "mode") return (
    <PageWrap>
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #e8500a, #c43a00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Ad Script Builder</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>Freedom Coach Method</div>
        </div>
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Start Here" />
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 10px" }}>What kind of ad are you writing?</h1>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 28 }}>The goal of your ad determines everything: the framework, the hook, the structure, and the CTA. Pick the right mode first.</p>
        {Object.values(AD_MODES).map(m => (
          <button key={m.id} onClick={() => { setAdMode(m.id); setView("awareness"); }} style={{
            width: "100%", background: "#111", border: "1px solid #1e1e1e",
            borderRadius: 12, padding: "20px", cursor: "pointer", textAlign: "left",
            marginBottom: 10, transition: "all 0.15s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.background = "#141414"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#111"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#f0ede8" }}>{m.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color, background: "#1a1a1a", padding: "2px 8px", borderRadius: 20 }}>CTA: {m.id === "direct" ? "Buy / Apply" : m.id === "follower" ? "Follow Me" : "Get Freebie"}</div>
                </div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 8 }}>{m.tagline}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{m.description}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 3 }}>Best for</div>
                    <div style={{ fontSize: 11, color: "#557755" }}>{m.bestFor}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#8a4a4a", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 3 }}>Not for</div>
                    <div style={{ fontSize: 11, color: "#775555" }}>{m.notFor}</div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </PageWrap>
  );

  // ── AWARENESS ─────────────────────────────────────────────────────────────
  if (view === "awareness") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("mode")} right="1 of 4" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 1 of 4 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>Where is your audience right now?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>Eugene Schwartz called this Market Awareness. The stage your audience is at determines your hook, your framework, and how hard you sell.</p>
        <div style={{ background: "#1a0d0d", border: "1px solid #2e1a1a", borderRadius: 10, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#8a4a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>The #1 advertiser mistake</div>
          <p style={{ fontSize: 12, color: "#886666", lineHeight: 1.7, margin: 0 }}>Most advertisers default to Stage 4-5, pitching to people as if they already know and trust them. But the majority of cold traffic lives at Stage 2-3. Pitching too early is why most ads don't convert.</p>
        </div>
        {AWARENESS_STAGES.map(s => {
          const isRecommended = mode && s.bestModes?.includes(adMode);
          const isSelected = awarenessStage === s.id;
          return (
            <div key={s.id} style={{ background: isSelected ? "#131313" : "#111", border: `1px solid ${isSelected ? "#e8500a" : isRecommended ? "#2a3a2a" : "#1e1e1e"}`, borderRadius: 10, marginBottom: 8, overflow: "hidden", transition: "all 0.15s" }}>
              <button onClick={() => setAwarenessStage(isSelected ? null : s.id)} style={{ background: "none", border: "none", padding: "16px 18px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: isSelected ? "linear-gradient(135deg, #e8500a, #c43a00)" : "#1a1a1a", border: `1px solid ${isSelected ? "transparent" : "#2a2a2a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isSelected ? "#fff" : "#444" }}>{s.level}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8" }}>{s.label}</div>
                      {isRecommended && <div style={{ fontSize: 10, fontWeight: 700, color: "#4a8a4a", background: "#1a2e1a", padding: "2px 7px", borderRadius: 20 }}>Good for {mode?.label}</div>}
                      <div style={{ marginLeft: "auto", fontSize: 11, color: isSelected ? "#e8500a" : "#333" }}>{isSelected ? "▲" : "▼"}</div>
                    </div>
                    <div style={{ fontSize: 12, color: isSelected ? "#aaa" : "#555", lineHeight: 1.5 }}>{s.tagline}</div>
                  </div>
                </div>
              </button>
              {isSelected && (
                <div style={{ padding: "0 18px 18px", borderTop: "1px solid #1e1e1e" }}>
                  <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "What this means", text: s.description, color: "#555" },
                      { label: "Who lives here", text: s.whoLivesHere, color: "#4a7aaa" },
                      { label: "When to advertise here", text: s.whenToUse, color: "#4a8a4a" },
                      { label: "Common mistake", text: s.commonMistake, color: "#8a4a4a" },
                    ].map(row => (
                      <div key={row.label}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: row.color, marginBottom: 4 }}>{row.label}</div>
                        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{row.text}</div>
                      </div>
                    ))}
                    <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#444", marginBottom: 5 }}>Hook Strategy</div>
                      <div style={{ fontSize: 12, color: "#7ab87a", lineHeight: 1.6 }}>{s.hookStrategy}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{ marginTop: 16 }}>
          <PrimaryBtn onClick={() => setView("sophistication")} disabled={!awarenessStage}>Next: Market Sophistication →</PrimaryBtn>
        </div>
      </div>
    </PageWrap>
  );

  // ── SOPHISTICATION ────────────────────────────────────────────────────────
  if (view === "sophistication") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("awareness")} right="2 of 4" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 2 of 4 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>How saturated is your market?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>The more offers a market has seen, the more sophisticated your approach needs to be. A simple bold claim works in a fresh market. A jaded market needs a completely new angle.</p>
        <div style={{ background: "#0d100d", border: "1px solid #1a221a", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>Why this matters</div>
          <p style={{ fontSize: 12, color: "#668866", lineHeight: 1.7, margin: 0 }}>In a fresh market, a direct promise lands hard because nobody has made it before. In a saturated market, that same promise gets ignored. Jaded buyers need a new mechanism, a contrarian angle, or proof so specific it cannot be faked.</p>
        </div>
        {SOPHISTICATION_LEVELS.map(s => (
          <button key={s.id} onClick={() => setSophistication(s.id)} style={{ width: "100%", background: sophistication === s.id ? "#161616" : "#111", border: `1px solid ${sophistication === s.id ? "#e8500a" : "#1e1e1e"}`, borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8, transition: "all 0.15s" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: sophistication === s.id ? "#888" : "#555", lineHeight: 1.5 }}>{s.description}</div>
            {sophistication === s.id && <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #222", fontSize: 12, color: "#7ab87a", lineHeight: 1.5 }}>Hook approach: {s.hookMod}</div>}
          </button>
        ))}
        <div style={{ marginTop: 16 }}><PrimaryBtn onClick={() => setView("emotion")} disabled={!sophistication}>Next: Dominant Emotion →</PrimaryBtn></div>
      </div>
    </PageWrap>
  );

  // ── EMOTION ───────────────────────────────────────────────────────────────
  if (view === "emotion") return (
    <PageWrap>
      <TopBar title={mode?.label} onBack={() => setView("sophistication")} right="3 of 4" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <Eyebrow text="Step 3 of 4 — Breakthrough Advertising" />
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 10px" }}>What is your prospect feeling right now?</h2>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 8 }}>Schwartz said the most powerful ads don't create desire, they channel existing desire. Name the emotion your prospect is already carrying and your hook becomes a mirror.</p>
        <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderLeft: "3px solid #e8500a", borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Examples</div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.8 }}>Frustrated that other coaches are scaling and I'm stuck... Embarrassed I can't charge what I'm worth... Scared I'll be trading hours for dollars forever... Excited but overwhelmed about going online...</div>
        </div>
        <textarea value={dominantEmotion} onChange={e => setDominantEmotion(e.target.value)} placeholder="Describe the emotion in your prospect's own words..." rows={4} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, color: "#f0ede8", fontSize: 16, padding: "14px 16px", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#e8500a"} onBlur={e => e.target.style.borderColor = "#222"} />
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <PrimaryBtn onClick={() => setView("framework")} disabled={!dominantEmotion.trim()}>Next: Choose Framework →</PrimaryBtn>
          <GhostBtn onClick={() => setView("framework")}>Skip this step</GhostBtn>
        </div>
      </div>
    </PageWrap>
  );

  // ── FRAMEWORK ─────────────────────────────────────────────────────────────
  if (view === "framework") {
    const allFwIds = FRAMEWORKS_BY_MODE[adMode] || [];
    const recIds = (awarenessStage && adMode) ? (RECOMMENDED[adMode]?.[awarenessStage] || []) : [];
    const otherIds = allFwIds.filter(id => !recIds.includes(id));
    return (
      <PageWrap>
        <TopBar title={mode?.label} onBack={() => setView("emotion")} right="4 of 4" />
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
          <Eyebrow text="Step 4 of 4" />
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 6px" }}>Pick your framework</h2>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>Recommended options are based on your awareness stage and ad mode.</p>
          {recIds.length > 0 && <>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#4a8a4a", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10 }}>Recommended for {stage?.label} + {mode?.label}</div>
            {recIds.map(id => {
              const fw = FRAMEWORKS[id]; if (!fw) return null;
              return (
                <button key={id} onClick={() => startBuild(id)} style={{ width: "100%", background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#4a8a4a"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1a2e1a"}>
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 3 }}>{fw.label}</div><div style={{ fontSize: 12, color: "#7ab87a" }}>{fw.description}</div></div>
                  <div style={{ fontSize: 10, color: "#4a8a4a", fontWeight: 700, background: "#1a2e1a", padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>RECOMMENDED</div>
                </button>
              );
            })}
            {otherIds.length > 0 && <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "1.2px", textTransform: "uppercase", margin: "20px 0 10px" }}>Other Options</div>}
          </>}
          {otherIds.map(id => {
            const fw = FRAMEWORKS[id]; if (!fw) return null;
            return (
              <button key={id} onClick={() => startBuild(id)} style={{ width: "100%", background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#e8500a"; e.currentTarget.style.background = "#161616"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#111"; }}>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: "#f0ede8", marginBottom: 3 }}>{fw.label}</div><div style={{ fontSize: 12, color: "#555" }}>{fw.description}</div></div>
                <div style={{ fontSize: 11, color: "#444", background: "#1a1a1a", padding: "4px 10px", borderRadius: 20, flexShrink: 0, marginLeft: 12 }}>{fw.steps.length} steps</div>
              </button>
            );
          })}
        </div>
      </PageWrap>
    );
  }

  // ── BUILD ─────────────────────────────────────────────────────────────────
  if (view === "build" && step) {
    const modeColor = mode?.color || "#e8500a";
    const ctaData = step.ctaOptions ? CTA_OPTIONS[step.ctaOptions] : null;
    return (
      <PageWrap>
        <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={handleBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: modeColor, background: "#1a1a1a", padding: "3px 8px", borderRadius: 20 }}>{mode?.emoji} {mode?.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{framework?.label}</div>
          </div>
          <div style={{ fontSize: 12, color: "#444" }}>{currentStep + 1}/{steps.length}</div>
        </div>
        <div style={{ height: 3, background: "#1a1a1a" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${modeColor}, ${modeColor}cc)`, width: `${((currentStep + 1) / steps.length) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 20px" }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
            {steps.map((s, i) => <div key={s.id} style={{ height: 3, borderRadius: 2, flex: 1, background: i <= currentStep ? modeColor : "#1e1e1e", transition: "background 0.3s" }} />)}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: modeColor, textTransform: "uppercase", marginBottom: 8 }}>Step {currentStep + 1} of {steps.length}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", margin: "0 0 16px" }}>{step.label}</h2>
          <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderLeft: `3px solid ${modeColor}`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Writing Tip</div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{step.tip}</p>
          </div>
          {!ctaData && step.example && (
            <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Example</div>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>"{step.example}"</p>
            </div>
          )}
          {ctaData && (
            <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: modeColor, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>{ctaData.label}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>{ctaData.note}</div>
              {ctaData.groups.map((group, gi) => (
                <div key={gi} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{group.heading}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {group.options.map((opt, oi) => (
                      <button key={oi} onClick={() => setAnswers(prev => ({ ...prev, [step.id]: opt }))}
                        style={{ background: answers[step.id] === opt ? "#1a1a2e" : "#141414", border: `1px solid ${answers[step.id] === opt ? modeColor : "#222"}`, borderRadius: 7, padding: "8px 12px", cursor: "pointer", textAlign: "left", fontSize: 12, color: answers[step.id] === opt ? "#aac" : "#777", lineHeight: 1.5, transition: "all 0.15s" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: "#444", marginTop: 8, fontStyle: "italic" }}>Tap any option to use it, or write your own below.</div>
            </div>
          )}
          <textarea
            value={answers[step.id] || ""}
            onChange={e => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
            placeholder={step.placeholder}
            rows={ctaData ? 3 : 5}
            style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, color: "#f0ede8", fontSize: 16, padding: "14px 16px", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            onFocus={e => e.target.style.borderColor = modeColor}
            onBlur={e => e.target.style.borderColor = "#222"}
          />
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <PrimaryBtn onClick={handleNext} disabled={!answers[step.id]?.trim()}>
              {currentStep < steps.length - 1 ? "Next Step →" : "Generate Script ⚡"}
            </PrimaryBtn>
            {!answers[step.id]?.trim() && (
              <button onClick={handleNext} style={{ background: "none", border: "none", color: "#444", fontSize: 12, cursor: "pointer", padding: "8px" }}>Skip this step</button>
            )}
          </div>
        </div>
      </PageWrap>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  return (
    <PageWrap>
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={reset} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: 0 }}>← Start Over</button>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>Your Script</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ width: 40, height: 40, border: "3px solid #1e1e1e", borderTop: `3px solid ${mode?.color || "#e8500a"}`, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#555" }}>Writing your {mode?.label} script...</div>
            <div style={{ fontSize: 12, color: "#333", marginTop: 6 }}>Calibrating for {stage?.label} awareness</div>
          </div>
        ) : apiError ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f0ede8", marginBottom: 10 }}>Script generation failed</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 16px" }}>{apiError}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
              <button onClick={generateScript} style={{ padding: "14px", background: "linear-gradient(135deg, #e8500a, #c43a00)", border: "none", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Again</button>
              <button onClick={() => { setView("build"); setCurrentStep(steps.length - 1); }} style={{ padding: "14px", background: "#111", border: "1px solid #1e1e1e", color: "#888", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Go Back and Edit</button>
              <button onClick={reset} style={{ padding: "12px", background: "none", border: "none", color: "#444", fontSize: 12, cursor: "pointer" }}>Start Over</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[{ label: `${mode?.emoji} ${mode?.label}`, color: mode?.color }, { label: stage?.label, color: "#888" }, { label: soph?.label, color: "#888" }, { label: framework?.label, color: "#888" }].filter(t => t.label).map((tag, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 600, color: tag.color, background: "#1a1a1a", padding: "4px 10px", borderRadius: 20 }}>{tag.label}</div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.3px" }}>Your Script</h2>
              <button onClick={handleCopy} style={{ background: copied ? "#1a3a1a" : "#1a1a1a", border: `1px solid ${copied ? "#2a5a2a" : "#2a2a2a"}`, color: copied ? "#4caf50" : "#888", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>{copied ? "Copied ✓" : "Copy Script"}</button>
            </div>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13, lineHeight: 1.9, color: "#c8c5c0", margin: 0, fontFamily: "inherit" }}>
                {generatedScript.split("\n").map((line, i) => {
                  const isLabel = line.trim().startsWith("[") && line.includes("]");
                  const isNotes = line.includes("STRATEGY NOTES");
                  return (
                    <span key={i}>
                      {isLabel ? <span style={{ color: isNotes ? "#4a8a4a" : (mode?.color || "#e8500a"), fontWeight: 700, fontSize: 11, letterSpacing: "1px" }}>{line}</span> : line}
                      {"\n"}
                    </span>
                  );
                })}
              </pre>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <GhostBtn onClick={reset} style={{ flex: 1 }}>New Script</GhostBtn>
              <button onClick={() => { setView("build"); setCurrentStep(0); }} style={{ flex: 1, background: `linear-gradient(135deg, ${mode?.color || "#e8500a"}, ${mode?.color || "#c43a00"}cc)`, border: "none", color: "#fff", borderRadius: 10, padding: "14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Edit Answers</button>
            </div>
          </>
        )}
      </div>
    </PageWrap>
  );
}
