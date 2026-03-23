function AdminDashboard() {
  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <h1>Admin Dashboard</h1>
      <p>Manage users, content, logs, and model controls.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>User Management</h3>
          <p>Verify advocates and ban/unban accounts.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Content Management</h3>
          <p>Upload laws, edit case data, and update knowledge base.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Logs & Monitoring</h3>
          <p>API usage, query history, error logs, and AI responses.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3>Model Control</h3>
          <p>Enable/disable models and monitor latency.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
