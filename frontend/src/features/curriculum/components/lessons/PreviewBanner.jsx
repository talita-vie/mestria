export function PreviewBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-amber-500/15 border-b border-amber-500/25 px-4 py-2">
      <span className="material-symbols-outlined text-[16px] text-amber-400">
        visibility
      </span>
      <p className="text-label-sm text-amber-400">
        Modo Preview — Esta é a visualização que o aluno terá desta aula.
      </p>
    </div>
  );
}