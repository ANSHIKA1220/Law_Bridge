import { useState } from "react";

function MockCaseSimulator() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      text: "Courtroom transcript. Judge will ask questions; you respond as counsel.",
    },
    {
      role: "judge",
      text: "Counsel, summarize the core issue and applicable statute.",
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg = { role: "student", text: input };
    const judgeMsg = {
      role: "judge",
      text: "Consider Section 73 of the Contract Act for damages. What remedy are you seeking?",
    };
    setMessages((m) => [...m, userMsg, judgeMsg]);
    setInput("");
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
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Mock Case Simulator</h2>
      <div
        style={{
          display: "grid",
          gap: 10,
          marginBottom: 16,
          maxHeight: 420,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "student" ? "end" : "start",
              background:
                m.role === "student" ? "var(--cream-dark)" : "var(--cream)",
              padding: "12px 16px",
              borderRadius: 14,
              maxWidth: "85%",
              marginLeft: m.role === "student" ? "auto" : 0,
            }}
          >
            <strong
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: m.role === "student" ? "var(--accent)" : "var(--primary)",
                display: "block",
                marginBottom: 4,
              }}
            >
              {m.role}
            </strong>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text)" }}>{m.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Argue your point..."
          style={{ flex: 1 }}
        />
        <button onClick={send} className="btn">
          Reply
        </button>
      </div>
    </div>
  );
}

export default MockCaseSimulator;
