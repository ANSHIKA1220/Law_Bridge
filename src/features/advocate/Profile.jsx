import { useEffect, useState } from "react";
import { portalApi } from "../../api/portal.js";

function Profile() {
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [barId, setBarId] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    portalApi.advocate.profile().then((current) => {
      if (!current) return;
      setName(current.name || "");
      setExpertise(current.expertise || "");
      setBarId(current.barId || "");
      setVerified(Boolean(current.verified));
    });
  }, []);

  async function save() {
    await portalApi.advocate.saveProfile({ name, expertise, barId, verified });
    setStatus("Profile saved");
    setTimeout(() => setStatus(""), 2000);
  }

  return (
    <div
      style={{
        maxWidth: 600,
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 24 }}>Advocate Profile</h2>
      <div style={{ display: "grid", gap: 14 }}>
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Expertise / Specialization
          <input value={expertise} onChange={(e) => setExpertise(e.target.value)} />
        </label>
        <label>
          Bar Council ID
          <input value={barId} onChange={(e) => setBarId(e.target.value)} />
        </label>
        <label>
          Verification Status
          <select
            value={verified ? "Yes" : "No"}
            onChange={(e) => setVerified(e.target.value === "Yes")}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
      </div>
      <button onClick={save} className="btn" style={{ marginTop: 16 }}>
        Save Profile
      </button>
      {status && (
        <div
          style={{
            marginTop: 12,
            background: "rgba(45,138,86,0.1)",
            color: "var(--success)",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}

export default Profile;
