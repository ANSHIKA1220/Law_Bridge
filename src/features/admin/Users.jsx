import { useEffect, useState } from "react";
import { portalApi } from "../../api/portal.js";

function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    portalApi.admin.users().then((rows) => setItems(rows || []));
  }, []);

  async function setVerify(id, v) {
    await portalApi.admin.verifyUser(id, v);
    setItems(await portalApi.admin.users());
  }

  async function setBan(id, v) {
    await portalApi.admin.banUser(id, v);
    setItems(await portalApi.admin.users());
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
      <h2 style={{ marginTop: 0, fontSize: 24 }}>User Management</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((u) => (
          <div
            key={u.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 14,
              padding: 16,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ fontSize: 15 }}>{u.name}</strong>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 8,
                  padding: "2px 10px",
                  borderRadius: 6,
                  background: "var(--cream-dark)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                {u.role}
              </span>
              {u.barId && (
                <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>
                  Bar ID: {u.barId}
                </div>
              )}
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>
                Verified:{" "}
                <span style={{ color: u.verified ? "var(--success)" : "var(--text-muted)" }}>
                  {String(u.verified)}
                </span>{" "}
                &bull; Banned:{" "}
                <span style={{ color: u.banned ? "var(--error)" : "var(--text-muted)" }}>
                  {String(u.banned)}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {u.role === "Advocate" && (
                <>
                  <button
                    onClick={() => setVerify(u.id, true)}
                    className="btn"
                    style={{ fontSize: 13, padding: "8px 14px" }}
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => setVerify(u.id, false)}
                    className="btn secondary"
                    style={{ fontSize: 13, padding: "8px 14px" }}
                  >
                    Unverify
                  </button>
                </>
              )}
              <button
                onClick={() => setBan(u.id, !u.banned)}
                className="btn secondary"
                style={{
                  fontSize: 13,
                  padding: "8px 14px",
                  borderColor: u.banned ? "var(--success)" : "var(--error)",
                  color: u.banned ? "var(--success)" : "var(--error)",
                }}
              >
                {u.banned ? "Unban" : "Ban"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
