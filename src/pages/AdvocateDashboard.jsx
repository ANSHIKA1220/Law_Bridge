function AdvocateDashboard() {
  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <h1>Advocate Dashboard</h1>
      <p>Manage client requests, review AI summaries, and respond with templates.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Profile</h3>
          <p>Bar Council ID and verification status.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Client Requests</h3>
          <p>Accept or reject tickets and download documents.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Case Workspace</h3>
          <p>AI-generated summaries, uploaded files, and reply interface.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Response Templates</h3>
          <p>Predefined legal drafts and custom templates.</p>
        </div>
      </div>
    </div>
  );
}

export default AdvocateDashboard;
