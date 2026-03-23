import { NavLink, Outlet } from "react-router-dom";

function L({ to, label }) {
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

function AdminLayout() {
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
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          Admin Control
        </div>
        <L to="/dashboard/admin" label="Control Center" />
        <L to="/dashboard/admin/users" label="User Management" />
        <L to="/dashboard/admin/content" label="Content Management" />
        <L to="/dashboard/admin/logs" label="Logs & Monitoring" />
        <L to="/dashboard/admin/models" label="Model Control" />
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;
