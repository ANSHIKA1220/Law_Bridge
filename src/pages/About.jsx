function InfoBlock({ title, text }) {
  return (
    <div
      style={{
        padding: 28,
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 16,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: 18 }}>{title}</h3>
      <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>About LawBridge</h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          LawBridge exists to make law understandable and actionable for
          everyone. We combine AI reasoning with curated legal knowledge to help
          citizens, advocates, and students collaborate around documents, cases,
          and court preparation.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <InfoBlock
          title="Vision"
          text="Democratize access to legal understanding and professional-grade preparation for every citizen."
        />
        <InfoBlock
          title="Problem"
          text="Legal language is complex, professional help is expensive, and rights are often unclear to ordinary people."
        />
        <InfoBlock
          title="Why AI in Law"
          text="AI can summarize, cross-reference statutes, and surface precedents at speed, while still preserving human-in-the-loop decisions."
        />
        <InfoBlock
          title="Motivation"
          text="Academic rigor with real-world relevance, built for scalable impact in the Indian legal system."
        />
      </div>
    </div>
  );
}

export default About;
