import { Link } from "react-router-dom";

function CourtPrep() {
  const checklist = [
    "Three key documents gathered",
    "Original receipts organized",
    "Photo identification ready",
    "Relevant affidavit prepared",
  ];
  const tips = ["Professional attire", "Practice silence", "Address with respect"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Court Preparation Guide</h2>

        <h3>What to Say</h3>
        <div
          style={{
            background: "var(--cream)",
            padding: 16,
            borderRadius: 14,
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--text)",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          {'"Your Honor, the essence of the dispute concerns [issue description]. I have prepared evidence and references to demonstrate that the opposing claims lack merit."'}
        </div>

        <h3 style={{ marginTop: 20 }}>Evidence Checklist</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {checklist.map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid var(--card-border)",
                borderRadius: 12,
                padding: 14,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: "2px solid var(--card-border)",
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: 20 }}>Courtroom Tips</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {tips.map((tip) => (
            <div
              key={tip}
              style={{
                background: "var(--cream)",
                border: "1px solid var(--card-border)",
                borderRadius: 12,
                padding: 14,
                fontSize: 14,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {tip}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 18,
            background: "var(--primary)",
            color: "#fff",
            borderRadius: 14,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Still feeling unsure? Connect with a verified advocate for personalized guidance.
        </div>
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
        <h3 style={{ marginTop: 0 }}>Preparation Status</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Document script", status: "Ready", color: "var(--success)" },
            { label: "Evidence checklist", status: "75%", color: "var(--accent)" },
            { label: "Filings review", status: "Pending", color: "var(--text-muted)" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--card-border)",
                fontSize: 14,
              }}
            >
              <span>{item.label}</span>
              <span style={{ fontWeight: 600, color: item.color }}>{item.status}</span>
            </div>
          ))}
        </div>

        <h4 style={{ marginBottom: 10 }}>Next Steps</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/dashboard/citizen/cases" className="btn secondary" style={{ justifyContent: "center", fontSize: 13 }}>
            Find precedent
          </Link>
          <Link to="/dashboard/citizen/advocate-connect" className="btn" style={{ justifyContent: "center", fontSize: 13 }}>
            Connect with an expert
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourtPrep;
