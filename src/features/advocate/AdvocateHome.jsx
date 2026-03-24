import { useEffect, useState } from "react";
import { portalApi } from "../../api/portal.js";

function Stat({ label, value, accent }) {
  return (
    <div
      style={{
        padding: 18,
        background: accent ? "var(--cream)" : "var(--card-bg)",
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

function AdvocateHome() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    portalApi.advocate.requests().then((rows) => setRequests(rows || []));
  }, []);
  const newCount = requests.filter((r) => r.status === "open").length;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div>
        <h2 style={{ marginTop: 0, fontSize: 28 }}>Advocate Dashboard</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <Stat label="New Requests" value={newCount} accent />
          <Stat label="Total Requests" value={requests.length} />
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Case Request Queue</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {requests.map((r) => (
              <div
                key={r.id}
                style={{
                  border: "1px solid var(--card-border)",
                  borderRadius: 14,
                  padding: 14,
                  display: "grid",
                  gridTemplateColumns: "1fr 140px",
                  alignItems: "center",
                  transition: "all var(--transition)",
                }}
              >
                <div>
                  <strong style={{ fontSize: 15 }}>{r.subject}</strong>
                  <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>
                    {r.client} &bull; {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      background: r.status === "open" ? "var(--cream-dark)" : "var(--cream)",
                      color: r.status === "open" ? "var(--accent)" : "var(--text-muted)",
                    }}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <div style={{ color: "var(--text-muted)", padding: "12px 0" }}>No requests yet</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Legal Inbox</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "var(--text-muted)",
              fontSize: 14,
              lineHeight: 2,
            }}
          >
            <li>Template update: Consumer complaint draft refined</li>
            <li>Workspace: File upload supported</li>
            <li>Queue sorting added</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdvocateHome;
