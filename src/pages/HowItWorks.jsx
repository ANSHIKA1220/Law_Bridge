const STEPS = [
  {
    num: "01",
    title: "Upload Your Document",
    text: "Upload a sample legal document (PDF/Image). The system extracts readable text to prepare it for AI interpretation.",
  },
  {
    num: "02",
    title: "AI Analyzes Content",
    text: "The AI highlights important clauses, possible risks, and unclear terms to help users understand what the document means.",
  },
  {
    num: "03",
    title: "Match Case Law",
    text: "The system retrieves similar legal cases and related law sections from public legal records for reference.",
  },
  {
    num: "04",
    title: "Actionable Next Steps",
    text: "The platform suggests possible next actions such as reading related cases, viewing preparation guidance, or consulting a legal professional if needed.",
  },
  {
    num: "05",
    title: "Connect with Advocates",
    text: "Users can optionally seek professional legal advice outside the platform using the provided preparation summary and document insights.",
  },
];

function HowItWorks() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>How the AI Assists You</h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          From document upload to understandable legal guidance in five steps.
        </p>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            maxWidth: 520,
            margin: "8px auto 0",
            lineHeight: 1.7,
          }}
        >
          The system provides guidance and educational insights — it does not replace professional legal advice.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            style={{
              display: "flex",
              gap: 24,
              padding: "28px 0",
              borderBottom:
                i < STEPS.length - 1
                  ? "1px solid var(--card-border)"
                  : "none",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 36,
                fontWeight: 600,
                color: "var(--cream-dark)",
                lineHeight: 1,
                flexShrink: 0,
                width: 56,
              }}
            >
              {step.num}
            </div>
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{step.title}</h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
