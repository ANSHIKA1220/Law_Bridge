import { Link } from "react-router-dom";

function Stat({ label, value }) {
  return (
    <div
      style={{
        padding: 18,
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 14,
        minWidth: 120,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--font-heading)" }}>{value}</div>
    </div>
  );
}

function CitizenHome() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 28 }}>Welcome back</h2>
          <div style={{ display: "flex", gap: 12 }}>
            <Stat label="Documents" value="-" />
            <Stat label="Open Tickets" value="-" />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <Link
            to="/dashboard/citizen/document"
            style={{
              padding: 24,
              borderRadius: 20,
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              textDecoration: "none",
              color: "var(--text)",
              boxShadow: "var(--shadow-sm)",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ marginTop: 0 }}>Upload New Document</h3>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14 }}>
              Analyze agreements and extract risks.
            </p>
          </Link>
          <Link
            to="/dashboard/citizen/legal-qa"
            style={{
              padding: 24,
              borderRadius: 20,
              border: "1px solid var(--card-border)",
              background: "var(--cream)",
              textDecoration: "none",
              color: "var(--text)",
              boxShadow: "var(--shadow-sm)",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ marginTop: 0 }}>New Legal Query</h3>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14 }}>
              Ask a question and get case-backed answers.
            </p>
          </Link>
        </div>

        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>Recent Activities</h3>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ color: "var(--text-muted)", padding: "12px 0" }}>
              Live activity feed will appear after backend activity endpoints are enabled.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Updates</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "var(--text-muted)",
              fontSize: 14,
              lineHeight: 2,
            }}
          >
            <li>Advocate escalation available</li>
            <li>Case explorer adds filters</li>
            <li>Document analyzer improves risk detection</li>
          </ul>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Account Summary</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Stat label="Analysis Credits" value={12} />
            <Stat label="Case Searches" value={35} />
          </div>
          <button
            className="btn"
            style={{
              marginTop: 16,
              width: "100%",
              justifyContent: "center",
            }}
          >
            Download Case Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default CitizenHome;
