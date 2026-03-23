import { useState } from "react";

const steps = [
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  { key: "documents", label: "Documents" },
  { key: "budget", label: "Budget" },
  { key: "review", label: "Review" },
];

function Progress({ current }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={s.key} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              height: 4,
              borderRadius: 4,
              background: i <= current ? "var(--accent)" : "var(--card-border)",
              transition: "background 0.3s ease",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: i <= current ? 600 : 400,
              color: i <= current ? "var(--text)" : "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PostCase() {
  const [i, setI] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [budget, setBudget] = useState("");

  function onFiles(e) {
    setFiles(Array.from(e.target.files || []).map((f) => f.name));
  }
  function next() {
    setI(Math.min(i + 1, steps.length - 1));
  }
  function prev() {
    setI(Math.max(i - 1, 0));
  }
  function submit() {
    alert("Case submitted");
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Post a Case</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
        Describe your legal matter and connect with qualified advocates.
      </p>

      <Progress current={i} />

      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 32,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {i === 0 && (
          <div>
            <h3 style={{ marginTop: 0 }}>Case Category</h3>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              <option>Contract</option>
              <option>Consumer</option>
              <option>Property</option>
              <option>Civil Procedure</option>
            </select>
          </div>
        )}
        {i === 1 && (
          <div>
            <h3 style={{ marginTop: 0 }}>Describe Your Case</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              placeholder="Include facts, dates, jurisdiction, desired outcome..."
            />
            <small style={{ color: "var(--text-muted)", marginTop: 6, display: "block" }}>
              Be as detailed as possible for better advocate matching.
            </small>
          </div>
        )}
        {i === 2 && (
          <div>
            <h3 style={{ marginTop: 0 }}>Upload Documents</h3>
            <div
              style={{
                border: "2px dashed var(--card-border)",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
                background: "var(--cream)",
              }}
            >
              <input
                type="file"
                multiple
                onChange={onFiles}
                style={{ display: "block", margin: "0 auto" }}
              />
              <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "12px 0 0" }}>
                Upload contracts, agreements, or supporting files
              </p>
            </div>
            {files.length > 0 && (
              <ul style={{ marginTop: 16, paddingLeft: 20, color: "var(--text-muted)", fontSize: 14 }}>
                {files.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {i === 3 && (
          <div>
            <h3 style={{ marginTop: 0 }}>Budget Range</h3>
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 25,000"
              style={{ maxWidth: 300 }}
            />
            <small style={{ color: "var(--text-muted)", marginTop: 6, display: "block" }}>
              You can negotiate with the advocate later.
            </small>
          </div>
        )}
        {i === 4 && (
          <div>
            <h3 style={{ marginTop: 0 }}>Review & Submit</h3>
            <div
              style={{
                display: "grid",
                gap: 12,
                background: "var(--cream)",
                padding: 20,
                borderRadius: 12,
              }}
            >
              {[
                ["Category", category || "\u2014"],
                [
                  "Description",
                  description ? description.slice(0, 120) + "..." : "\u2014",
                ],
                ["Documents", `${files.length} file(s)`],
                ["Budget", budget ? `INR ${budget}` : "\u2014"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 500 }}>{label}</span>
                  <span style={{ color: "var(--text-muted)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          <button className="btn secondary" onClick={prev} disabled={i === 0}>
            Back
          </button>
          {i < steps.length - 1 ? (
            <button className="btn" onClick={next}>
              Continue
            </button>
          ) : (
            <button className="btn accent" onClick={submit}>
              Submit Case
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCase;
