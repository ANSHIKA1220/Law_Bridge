function Card({ title, subtitle, children, actions }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: 20,
        boxShadow: "var(--shadow-sm)",
        padding: 22,
        transition: "box-shadow var(--transition)",
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
            {subtitle && (
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
          {actions}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default Card;
