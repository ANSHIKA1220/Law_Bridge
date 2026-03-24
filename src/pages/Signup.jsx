import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../auth/auth.js";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Citizen");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await signUp({ name, email, password, role });
      if (user.role === "Citizen") navigate("/dashboard/citizen");
      else if (user.role === "Advocate") navigate("/dashboard/advocate");
      else if (user.role === "Admin") navigate("/dashboard/admin");
      else navigate("/dashboard/student");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 24,
          padding: "40px 36px",
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 28,
              marginBottom: 8,
            }}
          >
            Create your account
          </h1>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 15 }}>
            Join LawBridge and access legal intelligence
          </p>
        </div>

        <form
          onSubmit={handleCreate}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{ marginTop: 6 }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ marginTop: 6 }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              style={{ marginTop: 6 }}
            />
          </div>
          <div>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginTop: 6 }}
            >
              <option value="Citizen">Citizen</option>
              <option value="Advocate">Advocate</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              width: "100%",
              padding: "12px 16px",
              marginTop: 4,
              justifyContent: "center",
            }}
            disabled={loading}
          >
            Create Account
          </button>
        </form>

        {error && (
          <div style={{ marginTop: 16, color: "var(--error)", fontSize: 13 }}>{error}</div>
        )}

        <p
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 14,
            color: "var(--text-muted)",
          }}
        >
          Already registered?{" "}
          <Link to="/login" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
