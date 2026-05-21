// src/components/ui/Button.jsx
import { forwardRef } from "react";

/**
 * Button — componente base reutilizável do Mestria.
 *
 * @param {"primary" | "secondary" | "ghost" | "danger"} variant
 * @param {"sm" | "md" | "lg"} size
 * @param {React.ReactNode} leftIcon  — ícone antes do label (ex: <span className="material-symbols-outlined">add</span>)
 * @param {React.ReactNode} rightIcon — ícone após o label
 * @param {boolean} loading          — substitui conteúdo por spinner + desabilita
 * @param {boolean} fullWidth        — w-full
 */
const variantStyles = {
  primary: [
    "bg-primary-container text-on-primary",
    "hover:brightness-110 active:scale-[0.98]",
    "shadow-[0_4px_16px_rgba(255,107,0,0.15)]",
  ].join(" "),

  secondary: [
    "bg-secondary text-on-secondary",
    "hover:brightness-110 active:scale-[0.98]",
  ].join(" "),

  ghost: [
    "bg-transparent text-secondary border border-secondary/40",
    "hover:bg-secondary/5 active:scale-[0.98]",
  ].join(" "),

  danger: [
    "bg-error text-on-error",
    "hover:brightness-110 active:scale-[0.98]",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-label-sm rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-label-md rounded-lg gap-2",
  lg: "px-5 py-3 text-label-md rounded-lg gap-2",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "lg",
    leftIcon,
    rightIcon,
    loading = false,
    fullWidth = false,
    disabled = false,
    className = "",
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-semibold",
        "transition-all duration-150 select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.lg,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

/** Spinner interno leve */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

export { Button };
export default Button;
