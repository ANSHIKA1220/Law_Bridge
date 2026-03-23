function StudentDashboard() {
  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <h1>Law Student Dashboard</h1>
      <p>Practice with mock case simulations, learning hub, and AI-evaluated questions.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Mock Case Simulator</h3>
          <p>AI plays judge, student argues the case and gets feedback.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Learning Hub</h3>
          <p>Legal concepts, case studies, sample judgments, etiquette guide.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Practice Questions</h3>
          <p>MCQs and case-based problems with automated evaluation.</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
