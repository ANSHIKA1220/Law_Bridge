import { Link } from "react-router-dom";

function Section({ title, items, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ marginBottom: 8, color: color || "var(--text)" }}>{title}</h3>
      <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, color: "var(--text-muted)", lineHeight: 2 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function DocumentUnderstanding() {
  const summary =
    "This document outlines services to be delivered under a master services agreement. Obligations include timely delivery, confidentiality, and payment terms.";
  const clauses = ["Scope", "Term", "Payment", "Confidentiality", "Liability", "Termination"];
  const obligations = [
    "Deliver services per schedule",
    "Maintain confidentiality",
    "Invoice monthly",
    "Notify breach within 24h",
  ];
  const risks = [
    "Termination clause favors provider",
    "No explicit service credits",
    "Confidentiality exceptions broad",
  ];
  const redFlags = ["No cap on liability", "Indemnity one-sided"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Document Understanding</h2>
        <div
          style={{
            padding: 16,
            background: "var(--cream)",
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <h4 style={{ margin: "0 0 6px", color: "var(--accent)" }}>Summary</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)" }}>{summary}</p>
        </div>
        <Section title="Key Clauses" items={clauses} />
        <Section title="Obligations" items={obligations} />
        <Section title="Risks" items={risks} color="var(--accent)" />
        <Section title="Red Flags" items={redFlags} color="var(--error)" />
      </div>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
          height: "fit-content",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Next Steps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/dashboard/citizen/cases" className="btn secondary" style={{ justifyContent: "center" }}>
            Find similar cases
          </Link>
          <Link to="/dashboard/citizen/court-prep" className="btn secondary" style={{ justifyContent: "center" }}>
            Generate court script
          </Link>
          <Link to="/dashboard/citizen/advocate-connect" className="btn" style={{ justifyContent: "center" }}>
            Talk to advocate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DocumentUnderstanding;
