import { useState } from "react";
import { apiRequest } from "../../api/client.js";
import { getToken } from "../../auth/auth.js";

function LegalQA() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ask your legal question. Include facts and desired outcome for the most relevant guidance." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    setLoading(true);
    const question = input;
    setInput("");
    const userMsg = { role: "user", text: question };
    setMessages((m) => [...m, userMsg]);
    try {
      const result = await apiRequest("/chat", {
        method: "POST",
        token: getToken(),
        body: { message: question },
      });

      const suggestionsText = (result.suggestions || [])
        .map((s) => `• ${s}`)
        .join("\n");
      const relatedText = (result.related_cases || [])
        .map((c) => `• ${c.title} (score: ${Number(c.relevance_score).toFixed(2)})`)
        .join("\n");

      const assistantText = `${result.answer || ""}\n\n${
        suggestionsText ? `Suggestions:\n${suggestionsText}\n\n` : ""
      }${relatedText ? `Related cases:\n${relatedText}` : ""}`.trim();

      setMessages((m) => [...m, { role: "assistant", text: assistantText }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: err?.message || "Something went wrong contacting the server." },
      ]);
    } finally {
      setLoading(false);
    }
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
        <button onClick={send} className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default LegalQA;
