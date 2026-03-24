import { useEffect, useState } from "react";

import { apiRequest } from "../../api/client.js";

function CaseExplorer() {
  const [q, setQ] = useState("");
  const [court, setCourt] = useState("");
  const [year, setYear] = useState("");
  const [act, setAct] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParts = [];
    if (q.trim()) queryParts.push(q.trim());
    if (court) queryParts.push(court);
    if (year) queryParts.push(`year:${year}`);
    if (act) queryParts.push(act);

    const query = queryParts.join(" ").trim();
    if (!query) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const t = setTimeout(async () => {
      try {
        const res = await apiRequest(`/cases?query=${encodeURIComponent(query)}`);
        if (!cancelled) setResults(res || []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q, court, year, act]);

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Case Law Explorer</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by keyword..."
        />
        <select value={court} onChange={(e) => setCourt(e.target.value)}>
          <option value="">All Courts</option>
          <option>Supreme Court</option>
          <option>High Court</option>
          <option>District Court</option>
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2023</option>
        </select>
        <select value={act} onChange={(e) => setAct(e.target.value)}>
          <option value="">All Acts</option>
          <option>Contract Act</option>
          <option>Transfer of Property</option>
          <option>Consumer Act</option>
          <option>CrPC</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && (
          <div style={{ color: "var(--text-muted)", padding: 16, textAlign: "center" }}>Searching cases...</div>
        )}
        {!loading && results.map((r) => (
          <div
            key={r.title}
            style={{
              padding: 16,
              borderRadius: 14,
              border: "1px solid var(--card-border)",
              background: "var(--bg)",
              transition: "all var(--transition)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: 15 }}>{r.title}</strong>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--cream-dark)",
                  }}
                >
                  Relevance: {(Number(r.relevance_score) || 0).toFixed(2)}
                </span>
              </div>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--text-muted)" }}>{r.summary}</p>
          </div>
        ))}
        {!loading && results.length === 0 && (
          <div style={{ color: "var(--text-muted)", padding: 16, textAlign: "center" }}>
            Enter a query to search case law
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseExplorer;
