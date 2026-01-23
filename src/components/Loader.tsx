import "./Loader.scss";

export const Loader = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="skeleton-table">
  {Array.from({ length: rows }).map((_, i) => (
    <div className="skeleton-row" key={i}>
      <div className="skeleton-cell skeleton-image" />
      <div className="skeleton-cell" />
      <div className="skeleton-cell" />
      <div className="skeleton-cell skeleton-actions" />
    </div>
  ))}
</div>

  );
};