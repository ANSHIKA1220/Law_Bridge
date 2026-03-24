import { useEffect, useState } from "react";
import { portalApi } from "../../api/portal.js";

function Templates() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    portalApi.advocate.templates().then((rows) => setItems(rows || []));
  }, []);

  async function save() {
    if (!title.trim() || !body.trim()) return;
    const tpl = await portalApi.advocate.addTemplate({ title, body });
    setItems([tpl, ...items]);
    setTitle("");
    setBody("");
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Response Templates</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Template name"
            />
          </label>
          <label style={{ display: "block", marginTop: 12 }}>
            Draft
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder="Write your template content..."
            />
          </label>
          <button onClick={save} className="btn" style={{ marginTop: 12 }}>
            Save Template
          </button>
        </div>
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 14 }}>Saved Templates</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {items.map((t) => (
              <div
                key={t.id}
                style={{
                  border: "1px solid var(--card-border)",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <strong style={{ fontSize: 15 }}>{t.title}</strong>
                <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
                  {t.body}
                </p>
              </div>
            ))}
            {items.length === 0 && (
              <div style={{ color: "var(--text-muted)" }}>No templates saved yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
