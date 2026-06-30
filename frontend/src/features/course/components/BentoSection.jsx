// src/components/instructor/BentoSection.jsx
export function BentoSection({ title, icon, children, className = "" }) {
  return (
    <section className={`bg-surface-container-low border border-outline-variant rounded-xl p-6 md:p-8 relative overflow-hidden group ${className}`}>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl group-hover:bg-primary-container/20 transition-colors duration-700" />
      
      {title && (
        <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2 relative z-10">
          {icon && (
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          )}
          {title}
        </h3>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}