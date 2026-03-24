import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { portalApi } from "../../api/portal.js";

function SLink({ to, label }) {
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

function AdvocateLayout() {
  const [profile, setProfile] = useState({ name: "Advocate", expertise: "General Practice" });

  useEffect(() => {
    portalApi.advocate.profile().then((p) => {
      if (p) setProfile(p);
    });
  }, []);
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
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {profile.name.charAt(0)}
          </div>
          <div>
            <strong style={{ fontSize: 15 }}>{profile.name}</strong>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
              {profile.expertise}
            </div>
          </div>
        </div>

        <SLink to="/dashboard/advocate" label="Dashboard" />
        <SLink to="/dashboard/advocate/requests" label="Client Requests" />
        <SLink to="/dashboard/advocate/workspace" label="Case Workspace" />
        <SLink to="/dashboard/advocate/templates" label="Response Templates" />
        <SLink to="/dashboard/advocate/profile" label="Profile" />
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default AdvocateLayout;
