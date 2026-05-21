// src/components/ui/Input.jsx
import { forwardRef, useState, useId } from "react";

// ---------------------------------------------------------------------------
// Base field wrapper (label + input + error/hint)
// ---------------------------------------------------------------------------

/**
 * Input — campo de texto genérico.
 *
 * @param {string}  label       — rótulo visível acima do campo
 * @param {string}  hint        — texto auxiliar abaixo (cor neutra)
 * @param {string}  error       — mensagem de erro (sobrescreve hint, cor vermelha)
 * @param {React.ReactNode} leftAddon  — elemento dentro do campo, à esquerda
 * @param {React.ReactNode} rightAddon — elemento dentro do campo, à direita
 */
const Input = forwardRef(function Input(
  {
    label,
    hint,
    error,
    leftAddon,
    rightAddon,
    id: externalId,
    className = "",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-label-sm text-on-surface-variant select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-3 text-on-surface-variant pointer-events-none">
            {leftAddon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hint || error ? `${id}-help` : undefined}
          className={[
            "w-full bg-surface-container-lowest",
            "border rounded-lg py-2.5 transition-all",
            "text-body-md text-on-surface placeholder:text-on-surface-variant/40",
            "focus:outline-none focus:ring-2",
            leftAddon ? "pl-9" : "pl-3.5",
            rightAddon ? "pr-10" : "pr-3.5",
            hasError
              ? "border-error focus:border-error focus:ring-error/10"
              : "border-outline-variant/60 focus:border-secondary focus:ring-secondary/10",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {rightAddon && (
          <span className="absolute right-3">{rightAddon}</span>
        )}
      </div>

      {(hint || error) && (
        <p
          id={`${id}-help`}
          className={[
            "text-label-sm",
            hasError ? "text-error" : "text-on-surface-variant/70",
          ].join(" ")}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------
// Password strength helpers
// ---------------------------------------------------------------------------

/** Calcula 0–4 com base em critérios básicos */
export function calcPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(4, score);
}

const STRENGTH_META = [
  { label: "Muito fraca", color: "bg-error" },
  { label: "Fraca",     color: "bg-[#f57c00]" },
  { label: "Ok",     color: "bg-primary-container" },
  { label: "Boa",     color: "bg-[#388e3c]" },
  { label: "Forte",   color: "bg-[#1b5e20]" },
];

// ---------------------------------------------------------------------------
// PasswordStrengthBar
// ---------------------------------------------------------------------------

/**
 * PasswordStrengthBar — barra de força de senha (0–4 segmentos).
 *
 * @param {number} strength — valor de 0 a 4
 * @param {string} hint     — dica à direita (ex: "8+ characters")
 */
export function PasswordStrengthBar({ strength = 0, hint = "8+ caracteres" }) {
  const meta = STRENGTH_META[strength] ?? STRENGTH_META[0];

  return (
    <div className="flex flex-col gap-1 mt-1.5">
      <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-surface-container-high/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={[
              "h-full w-1/4 rounded-full transition-colors duration-300",
              i < strength ? meta.color : "bg-surface-variant",
            ].join(" ")}
          />
        ))}
      </div>
      <div className="flex justify-between items-center px-0.5">
        <span className="text-label-sm text-on-surface-variant">
          Força: {meta.label}
        </span>
        <span className="text-label-sm text-on-surface-variant/70">{hint}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PasswordInput — campo de senha com toggle + barra de força
// ---------------------------------------------------------------------------

/**
 * PasswordInput
 *
 * @param {boolean} showStrength — exibe a barra de força (default: false)
 * @param {string}  value        — controle externo necessário se showStrength=true
 */
export const PasswordInput = forwardRef(function PasswordInput(
  { showStrength = false, value, onChange, ...props },
  ref
) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? calcPasswordStrength(value ?? "") : 0;

  const toggleIcon = (
    <button
      type="button"
      onClick={() => setVisible((v) => !v)}
      className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 18 }}
      >
        {visible ? "visibility" : "visibility_off"}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col gap-0">
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        rightAddon={toggleIcon}
        value={value}
        onChange={onChange}
        {...props}
      />
      {showStrength && (
        <PasswordStrengthBar strength={strength} />
      )}
    </div>
  );
});

export { Input };
export default Input;
