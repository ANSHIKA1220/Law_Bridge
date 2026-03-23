import { listLaws, addLaw, listCases, addCase } from "./datastore.js";
import { useState } from "react";

function Content() {
  const [laws, setLaws] = useState(listLaws());
  const [cases, setCases] = useState(listCases());
  const [lawTitle, setLawTitle] = useState("");
  const [caseTitle, setCaseTitle] = useState("");

  function addLawItem() {
    if (!lawTitle.trim()) return;
    const l = addLaw(lawTitle);
    setLaws([l, ...laws]);
    setLawTitle("");
  }

  function addCaseItem() {
    if (!caseTitle.trim()) return;
    const c = addCase(caseTitle);
    setCases([c, ...cases]);
    setCaseTitle("");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 24 }}>Laws</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input
            value={lawTitle}
            onChange={(e) => setLawTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLawItem()}
            placeholder="Add law title"
            style={{ flex: 1 }}
          />
          <button onClick={addLawItem} className="btn" style={{ fontSize: 13, padding: "10px 16px" }}>
            Add
          </button>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {laws.map((l) => (
            <div
              key={l.id}
              style={{
                padding: "10px 14px",
                border: "1px solid var(--card-border)",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              {l.title}
            </div>
          ))}
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
        <h2 style={{ marginTop: 0, fontSize: 24 }}>Cases</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCaseItem()}
            placeholder="Add case title"
            style={{ flex: 1 }}
          />
          <button onClick={addCaseItem} className="btn" style={{ fontSize: 13, padding: "10px 16px" }}>
            Add
          </button>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {cases.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "10px 14px",
                border: "1px solid var(--card-border)",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              {c.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
