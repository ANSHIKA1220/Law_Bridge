import { listRequests, updateRequest } from "./datastore.js";
import { useState } from "react";

function Requests() {
  const [items, setItems] = useState(listRequests());

  function setStatus(id, status) {
    updateRequest(id, { status });
    setItems(listRequests());
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
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Client Requests</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 14,
              padding: 16,
              transition: "box-shadow var(--transition)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <strong style={{ fontSize: 15 }}>{r.subject}</strong>
                <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>
                  {r.client} &bull; {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  background:
                    r.status === "accepted"
                      ? "rgba(45,138,86,0.1)"
                      : r.status === "rejected"
                      ? "rgba(196,62,62,0.1)"
                      : "var(--cream-dark)",
                  color:
                    r.status === "accepted"
                      ? "var(--success)"
                      : r.status === "rejected"
                      ? "var(--error)"
                      : "var(--accent)",
                }}
              >
                {r.status}
              </span>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button onClick={() => setStatus(r.id, "accepted")} className="btn" style={{ fontSize: 13, padding: "8px 14px" }}>
                Accept
              </button>
              <button onClick={() => setStatus(r.id, "rejected")} className="btn secondary" style={{ fontSize: 13, padding: "8px 14px" }}>
                Reject
              </button>
              <button onClick={() => setStatus(r.id, "in_review")} className="btn secondary" style={{ fontSize: 13, padding: "8px 14px" }}>
                In Review
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ color: "var(--text-muted)", padding: "20px 0" }}>No client requests found</div>
        )}
      </div>
    </div>
  );
}

export default Requests;
