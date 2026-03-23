import { listModels, setModel } from "./datastore.js";
import { useState } from "react";

function Models() {
  const [items, setItems] = useState(listModels());

  function toggle(id, enabled) {
    setModel(id, enabled);
    setItems(listModels());
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
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Model Control</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 14,
              padding: 16,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div>
              <strong style={{ fontSize: 15 }}>{m.name}</strong>
              <div style={{ marginTop: 4 }}>
                <span
                  style={{
                    display: "inline-block",
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
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => toggle(m.id, true)}
                className="btn"
                style={{ fontSize: 13, padding: "8px 14px" }}
              >
                Enable
              </button>
              <button
                onClick={() => toggle(m.id, false)}
                className="btn secondary"
                style={{ fontSize: 13, padding: "8px 14px" }}
              >
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Models;
