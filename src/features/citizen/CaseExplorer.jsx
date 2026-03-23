import { useMemo, useState } from "react";

const DATA = [
  { id: 1, title: "ABC v. XYZ", court: "Supreme Court", year: 2021, act: "Contract Act", summary: "Termination clause interpretation." },
  { id: 2, title: "State v. Rao", court: "High Court", year: 2019, act: "CrPC", summary: "Procedure rights." },
  { id: 3, title: "Mehta v. Retailer", court: "District Court", year: 2023, act: "Consumer Act", summary: "Refund dispute." },
  { id: 4, title: "Tenant v. Landlord", court: "High Court", year: 2020, act: "Transfer of Property", summary: "Lease termination." },
];

function CaseExplorer() {
  const [q, setQ] = useState("");
  const [court, setCourt] = useState("");
  const [year, setYear] = useState("");
  const [act, setAct] = useState("");

  const results = useMemo(() => {
    return DATA.filter(
      (r) =>
        (!q ||
          r.title.toLowerCase().includes(q.toLowerCase()) ||
          r.summary.toLowerCase().includes(q.toLowerCase())) &&
        (!court || r.court === court) &&
        (!year || r.year === Number(year)) &&
        (!act || r.act === act)
    );
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
        {results.map((r) => (
          <div
            key={r.id}
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
                  {r.court}
                </span>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--cream-dark)",
                  }}
                >
                  {r.year}
                </span>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--cream-dark)",
                  }}
                >
                  {r.act}
                </span>
              </div>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--text-muted)" }}>{r.summary}</p>
          </div>
        ))}
        {results.length === 0 && (
          <div style={{ color: "var(--text-muted)", padding: 16, textAlign: "center" }}>
            No matching cases found
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseExplorer;
