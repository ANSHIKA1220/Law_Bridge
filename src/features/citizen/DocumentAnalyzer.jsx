import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../../api/client.js";
import { getToken } from "../../auth/auth.js";

function DocumentAnalyzer() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("text/")) {
      const content = await f.text();
      setText(content.slice(0, 1200));
    } else {
      setText("Preview not available. Analysis will run on upload.");
    }
  }

  async function analyze() {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiRequest("/document/upload", {
        method: "POST",
        token: getToken(),
        body: formData,
        isJson: false,
      });

      setResult({
        summary: res.summary || "",
        risks: res.risks || [],
        suggestions: res.suggestions || [],
      });
    } catch (err) {
      setResult({
        summary: err?.message || "Could not analyze document. Please try again.",
        risks: [],
        suggestions: [],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Upload Document</h2>
        <div
          style={{
            border: "2px dashed var(--card-border)",
            borderRadius: 14,
            padding: 32,
            textAlign: "center",
            background: "var(--cream)",
            marginBottom: 16,
          }}
        >
          <input type="file" onChange={onFile} />
          <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "8px 0 0" }}>
            PDF, images, or text files supported
          </p>
        </div>
        {file && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>
              {file.name}{" "}
              <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
                padding: 14,
                background: "var(--cream)",
                borderRadius: 12,
                maxHeight: 200,
                overflow: "auto",
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              {text}
            </div>
          </div>
        )}
        <button onClick={analyze} className="btn" disabled={loading || !file}>
          {loading ? "Analyzing..." : "Analyze Document"}
        </button>
      </div>

      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Analysis Results</h3>
        {!result && (
          <div style={{ color: "var(--text-muted)", padding: "20px 0" }}>
            Upload a document to run analysis
          </div>
        )}
        {result && (
          <div>
            <h4 style={{ color: "var(--accent)" }}>Summary</h4>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)" }}>{result.summary}</p>
            <h4 style={{ marginTop: 14 }}>Risks</h4>
            {result.risks?.length ? (
              <ul style={{ paddingLeft: 18, fontSize: 14, color: "var(--text-muted)" }}>
                {result.risks.map((r) => (
                  <li key={r} style={{ marginBottom: 4 }}>
                    {r}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No risks returned.</div>
            )}

            <h4 style={{ marginTop: 14 }}>Suggestions</h4>
            {result.suggestions?.length ? (
              <ul style={{ paddingLeft: 18, fontSize: 14, color: "var(--text-muted)" }}>
                {result.suggestions.map((s) => (
                  <li key={s} style={{ marginBottom: 4 }}>
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No suggestions returned.</div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              <Link to="/dashboard/citizen/cases" className="btn secondary" style={{ fontSize: 13 }}>
                Find similar cases
              </Link>
              <Link to="/dashboard/citizen/court-prep" className="btn secondary" style={{ fontSize: 13 }}>
                Generate court script
              </Link>
              <Link to="/dashboard/citizen/advocate-connect" className="btn secondary" style={{ fontSize: 13 }}>
                Talk to advocate
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentAnalyzer;
