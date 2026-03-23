import { Link } from "react-router-dom";

function RoleCard({ icon, title, to, subtitle, color }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        textDecoration: "none",
        color: "var(--text)",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 18,
        padding: 22,
        boxShadow: "var(--shadow-sm)",
        transition: "transform var(--transition), box-shadow var(--transition)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: color || "var(--cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "var(--primary)",
          }}
        >
          {icon}
        </div>
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{subtitle}</p>
    </Link>
  );
}

function RoleSelect() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, marginBottom: 6 }}>Choose your role</h1>
        <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 15 }}>
          Select a role to continue to login or registration
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <RoleCard
          icon="👤"
          title="Citizen"
          subtitle="Access document analysis, legal Q&A, and court prep."
          to="/auth/Citizen"
          color="var(--cream)"
        />
        <RoleCard
          icon="⚖️"
          title="Advocate"
          subtitle="Manage client requests, case workspaces, and templates."
          to="/auth/Advocate"
          color="#f6efe9"
        />
        <RoleCard
          icon="🎓"
          title="Student"
          subtitle="Practice mock court, explore cases, and learn with AI."
          to="/auth/Student"
          color="#ebeef7"
        />
        <RoleCard
          icon="🛠"
          title="Admin"
          subtitle="Invite-only access for system management and verification."
          to="/auth/Admin"
          color="#f3f3f3"
        />
      </div>
    </div>
  );
}

export default RoleSelect;
