import { useState } from "react";

function Workspace() {
  const [files, setFiles] = useState([]);
  const [reply, setReply] = useState("");

  function onFiles(e) {
    const selected = Array.from(e.target.files || []).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    setFiles((f) => [...f, ...selected]);
  }

  function send() {
    if (!reply.trim()) return;
    setReply("");
    alert("Response sent.");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 24 }}>Case Workspace</h2>
        <div
          style={{
            border: "2px dashed var(--card-border)",
            borderRadius: 14,
            padding: 28,
            textAlign: "center",
            background: "var(--cream)",
            marginBottom: 16,
          }}
        >
          <input type="file" multiple onChange={onFiles} />
          <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "8px 0 0" }}>
            Upload case files, evidence, or client documents
          </p>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--card-border)",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: 14 }}>{f.name}</strong>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                {(f.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
          {files.length === 0 && (
            <div style={{ color: "var(--text-muted)", padding: "12px 0" }}>No files uploaded</div>
          )}
        </div>
      </div>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Reply Interface</h3>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={8}
          placeholder="Write your response to the client..."
          style={{ marginBottom: 12 }}
        />
        <button onClick={send} className="btn accent" style={{ width: "100%", justifyContent: "center" }}>
          Send Reply
        </button>
      </div>
    </div>
  );
}

export default Workspace;
