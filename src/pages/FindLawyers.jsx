import { useEffect, useState } from "react";

const DATA = [
  {
    id: 1,
    name: "Adv. Neha Sharma",
    years: 8,
    court: "Delhi High Court",
    verified: true,
    success: 86,
    specialty: "Constitutional Law",
  },
  {
    id: 2,
    name: "Adv. Arjun Mehta",
    years: 12,
    court: "Bombay High Court",
    verified: true,
    success: 78,
    specialty: "Corporate & Commercial",
  },
  {
    id: 3,
    name: "Adv. Kavya Rao",
    years: 5,
    court: "Lucknow District Court",
    verified: false,
    success: 69,
    specialty: "Family & Civil",
  },
];

function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          height: 14,
          width: "60%",
          background: "var(--cream-dark)",
          borderRadius: 6,
          marginBottom: 12,
          animation: "pulse 1.3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: 10,
          width: "40%",
          background: "var(--cream-dark)",
          borderRadius: 6,
          marginBottom: 20,
          animation: "pulse 1.3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: 10,
          width: "80%",
          background: "var(--cream-dark)",
          borderRadius: 6,
          animation: "pulse 1.3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function LawyerCard({ lawyer }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
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
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--cream-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          {lawyer.name
            .split(" ")
            .slice(1, 3)
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{lawyer.name}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
            {lawyer.specialty}
          </div>
        </div>
        {lawyer.verified && (
          <span
            style={{
              marginLeft: "auto",
              padding: "4px 10px",
              borderRadius: 8,
              background: "#e8f5ed",
              color: "var(--success)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Verified
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "12px 0",
          borderTop: "1px solid var(--card-border)",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Court</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>
            {lawyer.court}
          </div>
        </div>
        <div
          style={{
            width: 1,
            background: "var(--card-border)",
          }}
        />
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Experience
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>
            {lawyer.years} years
          </div>
        </div>
        <div
          style={{
            width: 1,
            background: "var(--card-border)",
          }}
        />
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Success
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>
            {lawyer.success}%
          </div>
        </div>
      </div>

      <button className="btn" style={{ width: "100%", justifyContent: "center" }}>
        Request Consultation
      </button>
    </div>
  );
}

function FindLawyers() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setItems(DATA);
      setLoading(false);
    }, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Find Lawyers</h1>
        <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 16 }}>
          Connect with verified advocates across India.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {loading
          ? [1, 2, 3].map((k) => <SkeletonCard key={k} />)
          : items.map((l) => <LawyerCard key={l.id} lawyer={l} />)}
      </div>
    </div>
  );
}

export default FindLawyers;
