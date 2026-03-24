import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { signIn, signUp } from "../auth/auth.js";

const FIELDS = {
  Citizen: [
    { key: "name", label: "Name", type: "text", for: "register" },
    { key: "phone", label: "Phone", type: "text", for: "register" },
  ],
  Advocate: [
    { key: "name", label: "Name", type: "text", for: "register" },
    { key: "barId", label: "Bar Council ID", type: "text", for: "register" },
    { key: "specialization", label: "Specialization", type: "text", for: "register" },
    { key: "experience", label: "Experience (years)", type: "number", for: "register" },
  ],
  Student: [
    { key: "name", label: "Name", type: "text", for: "register" },
    { key: "college", label: "College", type: "text", for: "register" },
    { key: "year", label: "Year", type: "text", for: "register" },
  ],
  Admin: [],
};

function Field({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={{ marginTop: 6 }} />
    </div>
  );
}

function RoleAuth() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(role === "Admin" ? "login" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [extra, setExtra] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roleFields = useMemo(() => FIELDS[role] || [], [role]);
  const isAdmin = role === "Admin";
  const canRegister = !isAdmin;

  function onExtraChange(key, value) {
    setExtra((prev) => ({ ...prev, [key]: value }));
  }

  function continueToDashboard(r) {
    if (r === "Citizen") navigate("/dashboard/citizen");
    else if (r === "Advocate") navigate("/dashboard/advocate");
    else if (r === "Student") navigate("/dashboard/student");
    else navigate("/dashboard/admin");
  }

  async function doLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await signIn({ email, role, password });
      continueToDashboard(user.role);
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function doRegister(e) {
    e.preventDefault();
    if (!canRegister) return;
    if (password !== confirm) return;
    setError(null);
    setLoading(true);
    try {
      const user = await signUp({ email, role, password, ...extra });
      continueToDashboard(user.role);
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "calc(100vh - 128px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ color: "var(--text-muted)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {role}
          </div>
          <h1 style={{ fontSize: 26, margin: "6px 0" }}>Welcome to LawBridge</h1>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>
            {isAdmin ? "Invite-only administrator login" : "Sign in or create an account"}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: canRegister ? "1fr 1fr" : "1fr",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => setTab("login")}
            className="btn secondary"
            style={{
              justifyContent: "center",
              background: tab === "login" ? "var(--cream-dark)" : "var(--card-bg)",
            }}
          >
            Login
          </button>
          {canRegister && (
            <button
              onClick={() => setTab("register")}
              className="btn secondary"
              style={{
                justifyContent: "center",
                background: tab === "register" ? "var(--cream-dark)" : "var(--card-bg)",
              }}
            >
              Register
            </button>
          )}
        </div>

        {tab === "login" ? (
          <form onSubmit={doLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <Field label="Password" type="password" value={password} onChange={setPassword} />
            <button type="submit" className="btn" style={{ justifyContent: "center" }} disabled={loading}>
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={doRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <Field label="Password" type="password" value={password} onChange={setPassword} />
            <Field label="Confirm Password" type="password" value={confirm} onChange={setConfirm} />
            {roleFields.map((f) => (
              <Field
                key={f.key}
                label={f.label}
                type={f.type}
                value={extra[f.key] || ""}
                onChange={(v) => onExtraChange(f.key, v)}
              />
            ))}
            <button type="submit" className="btn" style={{ justifyContent: "center" }} disabled={loading}>
              Create Account
            </button>
          </form>
        )}

        {error && (
          <div style={{ marginTop: 14, color: "var(--error)", fontSize: 13, textAlign: "center" }}>{error}</div>
        )}

        <div style={{ marginTop: 14, fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>
          <Link to="/auth/select">Choose a different role</Link>
        </div>
      </div>
    </div>
  );
}

export default RoleAuth;
