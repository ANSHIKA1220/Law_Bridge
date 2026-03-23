import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "var(--primary)",
        color: "#fff",
        padding: "56px 32px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 24,
              marginBottom: 12,
            }}
          >
            LawBridge.
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 14,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {"Academic prototype demonstrating AI-assisted legal understanding. Developed for student research and public legal awareness."}
          </p>
        </div>

        {/* Platform column */}
        <div>
          <h4
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            Platform
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { to: "/dashboard/citizen/cases", label: "Case Search" },
              { to: "/dashboard/citizen/document", label: "Doc Analysis" },
              { to: "/dashboard/citizen/court-prep", label: "Script Gen" },
              { to: "/dashboard/citizen/advocate-connect", label: "Advocate Connect" },
            ].map((item) => (
              <li key={item.to} style={{ marginBottom: 10 }}>
                <Link
                  to={item.to}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 14,
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.65)")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <h4
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { to: "/about", label: "About Us" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/disclaimer", label: "Privacy Policy" },
              { to: "/disclaimer", label: "Terms of Service" },
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                <Link
                  to={item.to}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 14,
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.65)")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance column */}
        <div>
          <h4
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            Notice
          </h4>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 14,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            This platform provides informational assistance and does not replace professional legal advice.
            Built for academic and research purposes.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "24px auto 0",
          padding: "0 0 8px",
        }}
      >
        <h4
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            marginTop: 0,
            marginBottom: 8,
          }}
        >
          AI Limitations & Transparency
        </h4>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 14,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          This system uses machine learning models trained on publicly available legal information.
          Outputs may be incomplete or inaccurate and should not be used as a substitute for professional legal advice.
        </p>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <small style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
          {"\u00A9"} {new Date().getFullYear()} LawBridge Intelligence. All rights
          reserved.
        </small>
        <div />
      </div>
    </footer>
  );
}

export default Footer;
