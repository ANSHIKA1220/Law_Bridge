import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { seedIfEmpty } from "./datastore.js";

function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 14px",
        borderRadius: 10,
        background: isActive ? "var(--cream-dark)" : "transparent",
        color: "var(--primary)",
        textDecoration: "none",
        marginBottom: 4,
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        transition: "all var(--transition)",
      })}
    >
      {label}
    </NavLink>
  );
}

function CitizenLayout() {
  seedIfEmpty();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 24,
        maxWidth: 1200,
        margin: "24px auto",
        padding: "0 24px",
      }}
    >
      <aside
        style={{
          padding: 20,
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: 20,
          boxShadow: "var(--shadow-sm)",
          height: "fit-content",
          position: "sticky",
          top: 88,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            LB
          </div>
          <div>
            <strong style={{ fontSize: 15 }}>LawBridge</strong>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Citizen Portal</div>
          </div>
        </div>

        <SidebarLink to="/dashboard/citizen" label="Dashboard" />
        <SidebarLink to="/dashboard/citizen/document" label="Document Analyzer" />
        <SidebarLink to="/dashboard/citizen/understanding" label="Understanding" />
        <SidebarLink to="/dashboard/citizen/legal-qa" label="Legal Q&A" />
        <SidebarLink to="/dashboard/citizen/cases" label="Case Explorer" />
        <SidebarLink to="/dashboard/citizen/court-prep" label="Court Prep" />
        <SidebarLink to="/dashboard/citizen/advocate-connect" label="Advocate Connect" />

        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "var(--cream)",
            border: "1px solid var(--card-border)",
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Support</div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>help@lawbridge.in</div>
          <button
            onClick={() => navigate("/disclaimer")}
            className="btn secondary"
            style={{
              marginTop: 10,
              width: "100%",
              fontSize: 13,
              padding: "8px 12px",
              justifyContent: "center",
            }}
          >
            Read Disclaimer
          </button>
        </div>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default CitizenLayout;
