// src/components/instructor/Stepper.jsx
export function Stepper({ currentStep = 1, steps = [] }) {
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-12 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-outline-variant/40 -z-10" />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary-container -z-10 transition-all duration-500"
        style={{ width: `${progressWidth}%` }}
      />

      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10 relative">
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center font-label-md font-bold ring-4 ring-background transition-colors",
                  isActive || isPast
                    ? "bg-primary-container text-on-primary shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                    : "bg-surface-variant border-2 border-outline-variant text-on-surface-variant",
                ].join(" ")}
              >
                {isPast ? <span className="material-symbols-outlined text-sm">check</span> : step.id}
              </div>
              <span
                className={`font-label-sm absolute top-12 whitespace-nowrap ${
                  isActive ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}