import { useState } from "react";
import { addActivity } from "./datastore.js";

function answerFor(q) {
  const lower = q.toLowerCase();
  if (lower.includes("lease"))
    return "Under the Transfer of Property Act, 1882, early termination depends on the clause. Check your notice period and any break clause. Courts weigh conduct and contractual terms.";
  if (lower.includes("refund"))
    return "Consumer Protection Act, 2019 allows refund claims for deficiency of service. Preserve invoices and communication. File a complaint with District Commission.";
  return "Review relevant sections and precedents. Provide facts, jurisdiction, and timeline for precise guidance.";
}

function LegalQA() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ask your legal question. Include facts and desired outcome for the most relevant guidance." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const reply = { role: "assistant", text: answerFor(input) };
    setMessages((m) => [...m, userMsg, reply]);
    addActivity("qa", input);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        minHeight: 500,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Legal Q&A</h2>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 16,
          overflowY: "auto",
          maxHeight: 400,
          padding: "4px 0",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
              background: m.role === "user" ? "var(--primary)" : "var(--cream)",
              color: m.role === "user" ? "#fff" : "var(--text)",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your legal question..."
          style={{ flex: 1 }}
        />
        <button onClick={send} className="btn">
          Send
        </button>
      </div>
    </div>
  );
}

export default LegalQA;
