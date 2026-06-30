// src/components/ui/Select.jsx
import { forwardRef, useId } from "react";

export const Select = forwardRef(function Select(
  { label, hint, error, options = [], id: externalId, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-label-sm text-on-surface-variant select-none uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={id}
          aria-invalid={hasError}
          className={[
            "w-full bg-surface-container-lowest",
            "border rounded-lg py-2.5 pl-3.5 pr-10 transition-all",
            "text-body-md text-on-surface appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2",
            hasError
              ? "border-error focus:border-error focus:ring-error/10"
              : "border-outline-variant/60 focus:border-primary-container focus:ring-primary-container/10",
            className,
          ].join(" ")}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 pointer-events-none text-on-surface-variant material-symbols-outlined">
          expand_more
        </span>
      </div>

      {(hint || error) && (
        <p className={`text-label-sm ${hasError ? "text-error" : "text-on-surface-variant/70"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});