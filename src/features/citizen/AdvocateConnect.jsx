import { useState } from "react";
import { apiRequest } from "../../api/client.js";
import { getToken } from "../../auth/auth.js";

function AdvocateConnect() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Contract");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function raise() {
    if (!subject.trim()) return;
    setLoading(true);
    setStatus(null);
    const issue = `${category}: ${subject}`.trim();

    try {
      const res = await apiRequest("/ticket/create", {
        method: "POST",
        token: getToken(),
        body: { issue },
      });
      setStatus(`Ticket #${res.id} raised. Status: ${res.status}.`);
      setSubject("");
    } catch (err) {
      setStatus(err?.message || "Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 28,
        maxWidth: 700,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Advocate Connect</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
        Raise a consultation ticket and a verified advocate will respond within 24 hours.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label>Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of your legal issue"
            style={{ marginTop: 6 }}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginTop: 6 }}
          >
            <option>Contract</option>
            <option>Consumer</option>
            <option>Property</option>
            <option>Criminal</option>
          </select>
        </div>
        <button onClick={raise} className="btn" style={{ alignSelf: "flex-start" }} disabled={loading}>
          {loading ? "Raising..." : "Raise Ticket"}
        </button>
      </div>

      {status && (
        <div
          style={{
            marginTop: 20,
            background: "var(--cream)",
            border: "1px solid var(--card-border)",
            padding: 16,
            borderRadius: 12,
            fontSize: 14,
            color: "var(--success)",
            fontWeight: 500,
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}

export default AdvocateConnect;
