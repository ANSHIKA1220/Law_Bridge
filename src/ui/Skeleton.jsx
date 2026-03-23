function Skeleton({ lines = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 12,
            borderRadius: 6,
            background: "var(--cream-dark)",
            animation: "pulse 1.3s ease-in-out infinite",
            width: `${80 + Math.random() * 20}%`,
          }}
        />
      ))}
    </div>
  );
}

export default Skeleton;
