import { Link } from "react-router-dom";

const RESOURCES = [
  {
    title: "Legal Guides",
    subtitle: "Plain-language explainers for common legal situations",
    to: "/dashboard/student/learning",
    label: "Open Learning Hub",
  },
  {
    title: "Case Library",
    subtitle: "Landmark case summaries and legal precedent database",
    to: "/dashboard/student/library",
    label: "Browse Cases",
  },
  {
    title: "Ask a Question",
    subtitle: "Get AI-powered answers grounded in Indian case law",
    to: "/dashboard/citizen/legal-qa",
    label: "Open Q&A",
  },
];

function Resources() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Resources</h1>
        <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 16 }}>
          Explore legal knowledge, case studies, and AI-powered assistance.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {RESOURCES.map((r) => (
          <div
            key={r.title}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 12,
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
            <h3 style={{ margin: 0, fontSize: 19 }}>{r.title}</h3>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, flex: 1 }}>
              {r.subtitle}
            </p>
            <Link to={r.to} className="btn" style={{ alignSelf: "flex-start", fontSize: 13 }}>
              {r.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
