import { useState } from "react";
import { listQuizzes } from "./datastore.js";

function PracticeQuiz() {
  const questions = listQuizzes();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const q = questions[idx];

  function submit() {
    if (selected == null) return;
    const correct = selected === q.answer;
    setResult({ correct, explanation: q.explanation });
  }

  function next() {
    setSelected(null);
    setResult(null);
    setIdx((idx + 1) % questions.length);
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
        maxWidth: 900,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Practice Questions</h2>
      <div
        style={{
          marginBottom: 6,
          fontSize: 13,
          color: "var(--text-muted)",
        }}
      >
        Question {idx + 1} of {questions.length}
      </div>
      <div style={{ marginBottom: 16, fontSize: 16, fontWeight: 500, lineHeight: 1.5 }}>
        {q.prompt}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {q.options.map((opt, i) => (
          <label
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              border: `1px solid ${selected === i ? "var(--accent)" : "var(--card-border)"}`,
              borderRadius: 12,
              padding: "12px 14px",
              cursor: "pointer",
              background: selected === i ? "var(--cream)" : "transparent",
              transition: "all var(--transition)",
            }}
          >
            <input
              type="radio"
              name="opt"
              checked={selected === i}
              onChange={() => setSelected(i)}
              style={{ width: "auto", accentColor: "var(--accent)" }}
            />
            <span style={{ fontSize: 14 }}>{opt}</span>
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={submit} className="btn">
          Submit
        </button>
        <button onClick={next} className="btn secondary">
          Next
        </button>
      </div>
      {result && (
        <div
          style={{
            marginTop: 16,
            background: result.correct ? "rgba(45,138,86,0.08)" : "rgba(196,62,62,0.08)",
            border: `1px solid ${result.correct ? "rgba(45,138,86,0.2)" : "rgba(196,62,62,0.2)"}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: result.correct ? "var(--success)" : "var(--error)",
              marginBottom: 4,
            }}
          >
            {result.correct ? "Correct!" : "Incorrect"}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
            {result.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticeQuiz;
