import { listLogs, addLog } from "./datastore.js";
import { useState } from "react";

function Logs() {
  const [items, setItems] = useState(listLogs());
  const [type, setType] = useState("api");
  const [message, setMessage] = useState("");

  function push() {
    if (!message.trim()) return;
    addLog({ type, message });
    setItems(listLogs());
    setMessage("");
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Logs & Monitoring</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: 140 }}>
          <option>api</option>
          <option>search</option>
          <option>model</option>
          <option>error</option>
        </select>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push()}
          placeholder="Add log entry"
          style={{ flex: 1 }}
        />
        <button onClick={push} className="btn" style={{ fontSize: 13, padding: "10px 16px" }}>
          Add
        </button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((l) => (
          <div
            key={l.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 12,
              padding: 12,
              display: "grid",
              gridTemplateColumns: "1fr 180px",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 14 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: 6,
                  background:
                    l.type === "error" ? "rgba(196,62,62,0.1)" : "var(--cream-dark)",
                  color: l.type === "error" ? "var(--error)" : "var(--accent)",
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
              {new Date(l.ts).toLocaleString()}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ color: "var(--text-muted)", padding: "12px 0" }}>No log entries</div>
        )}
      </div>
    </div>
  );
}

export default Logs;
