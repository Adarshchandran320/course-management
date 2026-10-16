
export default function StatCard({
  title,
  value,
  icon = "▦",
  description,
  accent = "indigo",
}) {
  return (
    <article className={`stat-card stat-card-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>

        <span className="stat-card-icon" aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className="stat-card-value">{value ?? 0}</div>

      {description && (
        <p className="stat-card-description">{description}</p>
      )}
    </article>
  );
}
