import { useState } from "react";
import { addDocument } from "./datastore.js";
import { Link } from "react-router-dom";

function DocumentAnalyzer() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

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

  function analyze() {
    if (!file) return;
    addDocument({ name: file.name, size: file.size, analyzed: true });
    const clauses = ["Scope of Service", "Limitation of Liability", "Confidentiality", "Indemnification"];
    const risks = ["Vague service scope", "Cap on damages missing", "Ambiguous termination clause"];
    setResult({
      clauses,
      risks,
      summary: "The document appears to be a service agreement with standard clauses. Consider clarifying scope and termination.",
    });
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
        <button onClick={analyze} className="btn">
          Analyze Document
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

            <h4>Key Clauses</h4>
            <ul style={{ paddingLeft: 18, fontSize: 14, color: "var(--text-muted)" }}>
              {result.clauses.map((c) => (
                <li key={c} style={{ marginBottom: 4 }}>{c}</li>
              ))}
            </ul>

            <h4 style={{ color: "var(--error)" }}>Risks</h4>
            <ul style={{ paddingLeft: 18, fontSize: 14, color: "var(--text-muted)" }}>
              {result.risks.map((r) => (
                <li key={r} style={{ marginBottom: 4 }}>{r}</li>
              ))}
            </ul>

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
