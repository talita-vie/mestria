// src/components/ui/Textarea.jsx
import { forwardRef, useId } from "react";

export const Textarea = forwardRef(function Textarea(
  { label, hint, error, id: externalId, className = "", maxLength, value, onChange, ...props },
  ref
) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);
  const currentLength = value?.length || 0;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-label-sm text-on-surface-variant select-none uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        aria-invalid={hasError}
        className={[
          "w-full bg-surface-container-lowest",
          "border rounded-lg py-2.5 px-3.5 transition-all resize-y",
          "text-body-md text-on-surface placeholder:text-on-surface-variant/40",
          "focus:outline-none focus:ring-2",
          hasError
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-outline-variant/60 focus:border-primary-container focus:ring-primary-container/10",
          className,
        ].join(" ")}
        {...props}
      />

      <div className="flex justify-between items-center mt-1">
        <p className={`text-label-sm ${hasError ? "text-error" : "text-on-surface-variant/70"}`}>
          {error ?? hint}
        </p>
        {maxLength && (
          <p className="text-label-sm text-on-surface-variant/70 text-right">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});