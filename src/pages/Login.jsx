import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../auth/auth.js";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Citizen");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    let user;
    try {
      user = await signIn({ email, password, role });
    } catch (err) {
      setError(err?.message || "Login failed");
      setLoading(false);
      return;
    }
    setLoading(false);
    if (user.role === "Citizen") navigate("/dashboard/citizen");
    else if (user.role === "Advocate") navigate("/dashboard/advocate");
    else if (user.role === "Student") navigate("/dashboard/student");
    else navigate("/dashboard/admin");
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
          maxWidth: 440,
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
            Welcome back
          </h1>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 15 }}>
            Sign in to your LawBridge account
          </p>
        </div>

        <form
          onSubmit={handleContinue}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: 16, color: "var(--error)", fontSize: 13, textAlign: "center" }}>{error}</div>
        )}

        <p
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 14,
            color: "var(--text-muted)",
          }}
        >
          New here?{" "}
          <Link to="/signup" style={{ fontWeight: 600 }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
