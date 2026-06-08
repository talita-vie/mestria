export function FilterButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-label-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}