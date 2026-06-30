import { Plus } from "lucide-react";

export function CoursesHeader({
  children,
  ...props
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-headline-lg text-on-surface">
          Meus Cursos
        </h1>

        <p className="text-body-md text-on-surface-variant">
          Gerencie seus cursos e acompanhe seu desempenho.
        </p>
      </div>

      <button
        className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-3 text-on-primary"
        {...props}
        >
        <Plus size={18} />
        {children}
      </button>
    </div>
  );
}