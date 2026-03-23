import { Link } from "react-router-dom";

/* ── Small reusable pieces ── */

function StatBadge() {
  return (
    <div
      style={{
        position: "absolute",
        right: -16,
        bottom: -16,
        background: "var(--card-bg)",
        borderRadius: 16,
        padding: "12px 18px",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--primary)",
          lineHeight: 1,
        }}
      >
        99.2%
      </span>
      <span
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
          marginTop: 2,
        }}
      >
        Extraction Accuracy
      </span>
    </div>
  );
}

function StepCard({ number, title, description, to }) {
  return (
    <Link
      to={to}
      style={{
        textAlign: "center",
        padding: 28,
        borderRadius: 16,
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        textDecoration: "none",
        color: "var(--text)",
        transition: "all var(--transition)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "var(--cream-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-heading)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--accent)",
        }}
      >
        {number}
      </div>
      <h4 style={{ margin: 0, fontSize: 17 }}>{title}</h4>
      <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5 }}>
        {description}
      </p>
    </Link>
  );
}

function FeatureCard({ title, description, to, variant }) {
  const bgMap = {
    dark: { bg: "var(--primary)", color: "#fff", accent: "rgba(255,255,255,0.7)" },
    warm: { bg: "#3d2b1f", color: "#fff", accent: "rgba(255,255,255,0.7)" },
    light: { bg: "var(--card-bg)", color: "var(--text)", accent: "var(--text-muted)" },
  };
  const style = bgMap[variant] || bgMap.light;

  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: 22,
        borderRadius: 16,
        background: style.bg,
        color: style.color,
        border: variant === "light" ? "1px solid var(--card-border)" : "none",
        textDecoration: "none",
        transition: "all var(--transition)",
        boxShadow: "var(--shadow-sm)",
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
      <h4 style={{ marginTop: 0, color: style.color, fontSize: 16 }}>{title}</h4>
      <p style={{ marginBottom: 0, color: style.accent, fontSize: 14, lineHeight: 1.5 }}>
        {description}
      </p>
    </Link>
  );
}

function CheckItem({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontSize: 15, color: "var(--text)" }}>{children}</span>
    </div>
  );
}

/* ── Main Landing ── */

function Landing() {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
          alignItems: "center",
          padding: "64px 32px 48px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div>
          <h1 style={{ fontSize: 56, color: "var(--primary)" }}>
            Understand Law.
          </h1>
          <h1
            style={{
              fontSize: 56,
              color: "var(--accent)",
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            Act with Confidence.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              marginTop: 20,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            An AI-powered legal assistance research platform built to help users
            understand legal documents, explore relevant case laws, and learn legal
            procedures in a simplified way.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Link to="/dashboard/citizen/document" className="btn">
              Try Document Analyzer (Beta)
            </Link>
            <Link to="/dashboard/citizen/legal-qa" className="btn secondary">
              Try Legal Assistant (Beta)
            </Link>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "var(--cream-dark)",
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              top: -28,
              left: -28,
              zIndex: 0,
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop"
            alt="Scales of justice symbolizing balanced legal analysis"
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: "var(--shadow-lg)",
              position: "relative",
              zIndex: 1,
            }}
          />
          <StatBadge />
        </div>
      </section>

      {/* ── Quote ── */}
      <section
        style={{
          textAlign: "center",
          padding: "40px 32px",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          The virtue of justice consists in moderation.
        </h2>
        <div className="section-divider" />
      </section>

      {/* ── 3-Step Process ── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "16px auto 48px",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        <StepCard
          number="1"
          title="Upload"
          description="Upload sample legal documents to see how the AI interprets them."
          to="/dashboard/citizen/document"
        />
        <StepCard
          number="2"
          title="Analyze"
          description="The system extracts clauses, risks, and simplified explanations for learning purposes."
          to="/dashboard/citizen/understanding"
        />
        <StepCard
          number="3"
          title="Execute"
          description="Generate guidance, summaries, and courtroom preparation suggestions (educational use)."
          to="/dashboard/citizen/court-prep"
        />
      </section>

      {/* ── Features Section ── */}
      <section
        style={{
          background: "var(--cream)",
          padding: "64px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Feature cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <FeatureCard
              title="Case Search"
              description="Instant access to millions of court records and precedents."
              to="/dashboard/citizen/cases"
              variant="light"
            />
            <FeatureCard
              title="Document Analyzer"
              description="Detect hidden clauses and legal risks in seconds."
              to="/dashboard/citizen/document"
              variant="warm"
            />
            <FeatureCard
              title="Court Scripts"
              description="AI-generated opening and closing statements based on facts."
              to="/dashboard/citizen/court-prep"
              variant="dark"
            />
            <FeatureCard
              title="Legal Learning"
              description="Understand procedures, etiquette, and required documents before court visits."
              to="/dashboard/citizen/court-prep"
              variant="light"
            />
          </div>

          {/* Right side content */}
          <div>
            <h2 style={{ fontSize: 36, marginBottom: 8 }}>
              AI Legal Understanding Engine{" "}
              <span
                style={{
                  color: "var(--accent)",
                  fontStyle: "italic",
                }}
              >
                (Student Research Project)
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Our platform doesn't just store documents; it understands them. By
              leveraging specialized LLMs trained on legal corpora, LawBridge
              provides insights that previously took days of research.
            </p>
            <CheckItem>Built using NLP and Retrieval-Augmented Generation</CheckItem>
            <CheckItem>Trained on publicly available Indian legal texts</CheckItem>
            <CheckItem>Designed for legal awareness and education</CheckItem>
            <CheckItem>Helps users understand next legal steps</CheckItem>
            <div style={{ marginTop: 28 }}>
              <Link to="/how-it-works" className="btn">
                Explore Features &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "64px 32px",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div />
        <div>
          <h3 style={{ marginTop: 0, fontSize: 22 }}>
            Developed as part of a B.Tech CSE (AI/ML) capstone project focused on accessible legal awareness using AI.
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            This prototype demonstrates how AI can assist with legal understanding for educational purposes. It is not a commercial product and does not replace professional legal advice.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "var(--primary)",
          padding: "56px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 36,
            marginBottom: 12,
          }}
        >
          Explore how AI can simplify legal understanding
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 16,
            maxWidth: 500,
            margin: "0 auto 28px",
            lineHeight: 1.6,
          }}
        >
          Learn about our student research project exploring AI for legal awareness, document analysis, and court preparation guidance.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Link
            to="/signup"
            className="btn accent"
            style={{ padding: "14px 28px", fontSize: 15 }}
          >
            Try Demo
          </Link>
          <Link
            to="/how-it-works"
            className="btn secondary"
            style={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              padding: "14px 28px",
              fontSize: 15,
            }}
          >
            View Project Details
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
