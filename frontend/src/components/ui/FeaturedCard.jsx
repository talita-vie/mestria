// src/components/ui/FeatureCard.jsx

/**
 * FeatureCard — card glassmorphism flutuante usado no painel lateral de auth.
 *
 * @param {string}          icon     — nome do Material Symbol (ex: "auto_graph")
 * @param {string}          title    — título do card
 * @param {string}          body     — descrição
 * @param {React.ReactNode} children — substitui title + body se fornecido
 */
function FeatureCard({ icon, title, body, children, className = "" }) {
  return (
    <div
      className={[
        "bg-surface/80 backdrop-blur-xl p-5 rounded-xl",
        "border border-white/50 shadow-[0_8px_32px_rgba(38,24,18,0.06)]",
        "transform transition-transform hover:-translate-y-1",
        className,
      ].join(" ")}
    >
      {children ?? (
        <div className="flex items-start gap-4">
          {/* Ícone */}
          {icon && (
            <div className="w-11 h-11 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-outline-variant/30 shadow-sm">
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontSize: 22 }}
              >
                {icon}
              </span>
            </div>
          )}

          {/* Texto */}
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3 className="text-label-md font-semibold text-on-surface">{title}</h3>
            )}
            {body && (
              <p className="text-label-sm text-on-surface-variant">{body}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { FeatureCard };
export default FeatureCard;
