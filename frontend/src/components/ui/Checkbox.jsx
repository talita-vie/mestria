// src/components/ui/Checkbox.jsx
import { useId } from "react";

/**
 * Checkbox — campo de seleção com label integrado.
 *
 * @param {string}   label    — texto ao lado do checkbox
 * @param {string}   hint     — texto auxiliar abaixo (opcional)
 * @param {string}   error    — mensagem de erro (opcional)
 * @param {boolean}  checked  — estado controlado
 * @param {function} onChange — handler de mudança
 */
function Checkbox({
  label,
  hint,
  error,
  checked,
  onChange,
  id: externalId,
  disabled = false,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div className={["flex flex-col gap-1", className].join(" ")}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hint || error ? `${id}-help` : undefined}
          className={[
            "h-4 w-4 rounded border-outline-variant cursor-pointer",
            "bg-surface-container-lowest transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-secondary/20",
            hasError
              ? "border-error text-error"
              : "text-primary",
            disabled ? "opacity-40 cursor-not-allowed" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={[
              "text-body-md text-on-surface-variant select-none",
              disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {label}
          </label>
        )}
      </div>

      {(hint || error) && (
        <p
          id={`${id}-help`}
          className={[
            "text-label-sm pl-6",
            hasError ? "text-error" : "text-on-surface-variant/70",
          ].join(" ")}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export { Checkbox };
export default Checkbox;