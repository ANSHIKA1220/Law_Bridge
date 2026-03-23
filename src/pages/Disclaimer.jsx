const ITEMS = [
  {
    title: "Not Legal Advice",
    text: "LawBridge is not a substitute for licensed legal advice. All information is for general guidance only.",
  },
  {
    title: "User Responsibility",
    text: "AI-generated outputs are suggestions; users remain fully responsible for decisions and actions taken.",
  },
  {
    title: "Data Privacy",
    text: "Data privacy is a core principle. We encrypt all data at rest and in transit, and never sell user information.",
  },
  {
    title: "Legal Sources",
    text: "All results are grounded in Indian law sources where applicable. Coverage of other jurisdictions may be limited.",
  },
];

function Disclaimer() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>Legal Disclaimer</h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Please review these important notices before using our platform.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ITEMS.map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              gap: 20,
              padding: 24,
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: 16,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                marginTop: 8,
              }}
            />
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 17 }}>{item.title}</h3>
              <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Disclaimer;
