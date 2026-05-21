// src/components/ui/Link.jsx

/**
 * Link — ancora estilizada seguindo o design system do Mestria.
 *
 * @param {"primary" | "secondary" | "subtle"} variant
 * @param {boolean} external — adiciona target="_blank" rel="noopener noreferrer"
 */
function Link({
  variant = "secondary",
  external = false,
  className = "",
  children,
  href = "#",
  ...props
}) {
  const variantStyles = {
    primary:   "text-primary font-semibold hover:underline",
    secondary: "text-secondary font-semibold hover:underline",
    subtle:    "text-on-surface-variant hover:text-on-surface hover:underline",
  };

  return (
    <a
      href={href}
      className={[
        "transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 rounded",
        variantStyles[variant] ?? variantStyles.secondary,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export { Link };
export default Link;