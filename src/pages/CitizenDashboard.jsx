function CitizenDashboard() {
  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <h1>Citizen Dashboard</h1>
      <p>Access document analysis, legal Q&A, case explorer, and court preparation tools.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Upload Document</h3>
          <p>Upload PDF/Image for OCR and analysis.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Legal Q&A</h3>
          <p>Ask questions and see precedent-backed answers.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Case Law Explorer</h3>
          <p>Search judgments by court/year/act.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Court Preparation</h3>
          <p>Scripts, checklists, and filing instructions.</p>
        </div>
      </div>
    </div>
  );
}

export default CitizenDashboard;
