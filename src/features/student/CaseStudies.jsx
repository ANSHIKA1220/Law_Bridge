import { listCaseStudies } from "./datastore.js";
import { useMemo, useState } from "react";

function CaseStudies() {
  const all = listCaseStudies();
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const results = useMemo(() => {
    return all.filter(
      (c) =>
        (!q ||
          c.title.toLowerCase().includes(q.toLowerCase()) ||
          c.summary.toLowerCase().includes(q.toLowerCase())) &&
        (!area || c.area === area)
    );
  }, [all, q, area]);

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Landmark Case Studies</h2>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 20 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search cases..."
        />
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">All Areas</option>
          <option>Contract</option>
          <option>Constitutional</option>
          <option>Consumer</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {results.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 14,
              padding: 16,
              transition: "box-shadow var(--transition)",
            }}
          >
            <strong style={{ fontSize: 15 }}>{c.title}</strong>
            <div
              style={{
                display: "inline-block",
                marginTop: 6,
                padding: "3px 10px",
                borderRadius: 6,
                background: "var(--cream-dark)",
                color: "var(--accent)",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {c.area}
            </div>
            <p style={{ margin: "8px 0 0", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
              {c.summary}
            </p>
          </div>
        ))}
        {results.length === 0 && (
          <div style={{ color: "var(--text-muted)", gridColumn: "1 / -1", padding: 16 }}>
            No matching case studies
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseStudies;
