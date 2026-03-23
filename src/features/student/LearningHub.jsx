import { listTopics } from "./datastore.js";

function LearningHub() {
  const topics = listTopics();
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Learning Hub</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
        Structured concepts and study guides to strengthen your legal foundations.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {topics.map((t) => (
          <div
            key={t}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 14,
              padding: 18,
              transition: "box-shadow var(--transition)",
            }}
          >
            <strong style={{ fontSize: 15 }}>{t}</strong>
            <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5 }}>
              Overview and study guide for {t}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningHub;
