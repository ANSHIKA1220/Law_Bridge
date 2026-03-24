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
            // Deterministic "random-looking" width to keep render pure (ESLint react-hooks/purity).
            width: `${80 + ((i * 13) % 21)}%`,
          }}
        />
      ))}
    </div>
  );
}

export default Skeleton;
