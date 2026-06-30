export function StatusBadge({
  label,
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-label-sm ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {label}
    </span>
  );
}