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

function AdminHome() {
  const [logs, setLogs] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function load() {
      const [logRows, modelRows] = await Promise.all([portalApi.admin.logs(), portalApi.admin.models()]);
      setLogs(logRows || []);
      setModels(modelRows || []);
    }
    load();
  }, []);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div>
        <h2 style={{ marginTop: 0, fontSize: 28 }}>Admin Control Center</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <Stat label="Recent Logs" value={logs.length} accent />
          <Stat label="Models Enabled" value={models.filter((m) => m.enabled).length} />
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            padding: 22,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Activity Snapshot</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {logs.map((l) => (
              <div
                key={l.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px",
                  border: "1px solid var(--card-border)",
                  borderRadius: 12,
                  padding: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 14 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: "var(--cream-dark)",
                      color: "var(--accent)",
                      fontSize: 12,
                      fontWeight: 500,
                      marginRight: 8,
                    }}
                  >
                    {l.type}
                  </span>
                  {l.message}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, textAlign: "right" }}>
                  {new Date(l.ts).toLocaleTimeString()}
                </div>
              </div>
            ))}
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
          <h3 style={{ marginTop: 0 }}>Model Status</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {models.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--card-border)",
                  fontSize: 14,
                }}
              >
                <span>{m.name}</span>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    background: m.enabled ? "rgba(45,138,86,0.1)" : "rgba(196,62,62,0.1)",
                    color: m.enabled ? "var(--success)" : "var(--error)",
                  }}
                >
                  {m.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
