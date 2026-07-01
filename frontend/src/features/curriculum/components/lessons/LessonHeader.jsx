export function LessonHeader({
  onBack,
  backLabel = "Voltar ao Curso",
  courseName,
  actions,
}) {
  return (
    <header className="sticky top-8 z-30 flex items-center justify-between px-6 h-14 border-b border-white/10 bg-[#120d0a]/95 backdrop-blur-md">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-label-md text-white/60 hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          arrow_back
        </span>
        {backLabel}
      </button>

      <span className="text-label-lg font-semibold text-white" title={courseName}
      >
      {courseName}
      </span>

      {actions ?? (
        <button className="text-label-md text-white/60 hover:text-white transition-colors">
          Ajuda
        </button>
      )}
    </header>
  );
}