import { listTopics } from "./datastore.js";
import { Link } from "react-router-dom";

function FeatureCard({ title, to, desc }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: 22,
        borderRadius: 16,
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
      <h3 style={{ marginTop: 0, fontSize: 17 }}>{title}</h3>
      <p style={{ marginBottom: 0, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5 }}>
        {desc}
      </p>
    </Link>
  );
}

function StudentHome() {
  const topics = listTopics();
  return (
    <div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 28 }}>Sharpen your legal mind</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
            Practice daily with simulations, case studies, and AI-evaluated questions.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <Link to="/dashboard/student/simulator" className="btn">
              Mock Case Simulator
            </Link>
            <Link to="/dashboard/student/quiz" className="btn secondary">
              Practice Quiz
            </Link>
          </div>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Quick Topics</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "var(--text-muted)",
              fontSize: 14,
              lineHeight: 2,
            }}
          >
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <FeatureCard
          title="Case Studies Library"
          to="/dashboard/student/library"
          desc="Explore landmark cases and summaries."
        />
        <FeatureCard
          title="Learning Hub"
          to="/dashboard/student/learning"
          desc="Structured concepts and guides."
        />
        <FeatureCard
          title="Practice Questions"
          to="/dashboard/student/quiz"
          desc="MCQs and case-based evaluation."
        />
      </section>
    </div>
  );
}

export default StudentHome;
