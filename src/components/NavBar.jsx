import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, signOut } from "../auth/auth.js";

function NavBar() {
  const navigate = useNavigate();
  const [shadow, setShadow] = useState(false);
  const user = getUser();

  useEffect(() => {
    function onScroll() {
      setShadow(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goDashboard() {
    if (!user) return navigate("/login");
    if (user.role === "Citizen") navigate("/dashboard/citizen");
    else if (user.role === "Advocate") navigate("/dashboard/advocate");
    else if (user.role === "Admin") navigate("/dashboard/admin");
    else navigate("/dashboard/student");
  }

  function doSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <header
      className={`navbar ${shadow ? "shadow" : ""}`}
      style={{
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--primary)",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "-0.02em",
          }}
        >
          LawBridge.
        </Link>
        <span
          style={{
            display: "inline-block",
            marginLeft: 8,
            padding: "4px 8px",
            borderRadius: 8,
            background: "var(--cream-dark)",
            color: "var(--accent)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Prototype | Academic Project
        </span>
        <nav
          style={{
            display: "flex",
            gap: 4,
          }}
        >
          <NavLink
            to="/how-it-works"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            How It Works
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Features
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            About
          </NavLink>
        </nav>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Link to="/dashboard/citizen/document" className="btn secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
          Upload Document
        </Link>
        <Link to="/dashboard/citizen/legal-qa" className="btn secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
          Ask AI
        </Link>
        {user ? (
          <>
            <button className="btn secondary" onClick={goDashboard} style={{ fontSize: 13, padding: "8px 16px" }}>
              Dashboard
            </button>
            <button
              onClick={doSignOut}
              className="btn"
              style={{ fontSize: 13, padding: "8px 16px", background: "var(--primary)", color: "#fff" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/select" className="btn secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
              Login
            </Link>
            <Link to="/auth/select" className="btn" style={{ fontSize: 13, padding: "8px 16px" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
