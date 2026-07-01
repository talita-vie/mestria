// src/features/instructor/pages/LessonPreview.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useLessonPreview } from "@/features/curriculum/hooks/useLesson";
import { LessonHeader } from "@/features/curriculum/components/lessons/LessonHeader";
import { PreviewBanner } from "@/features/curriculum/components/lessons/PreviewBanner";
import { LessonContent } from "../../curriculum/components/lessons/LessonContent";
import { InfoCard } from "@/features/curriculum/components/lessons/LessonInfoCard";
// ─────────────────────────────────────────────────────────────
// Página principal
// ─────────────────────────────────────────────────────────────

export default function LessonPreview() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { lesson, loading, error } = useLessonPreview(lessonId);

  const handleBack = () =>
    navigate(courseId ? `/instrutor/cursos/${courseId}/curriculo` : -1);

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#120d0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-5xl text-primary animate-pulse">
            movie
          </span>
          <p className="text-label-md text-white/50">Carregando aula...</p>
        </div>
      </div>
    );
  }

  // ── Erro ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#120d0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
          <span className="material-symbols-outlined text-5xl text-error">
            error_outline
          </span>
          <p className="text-body-md text-white/70">{error}</p>
          <button
            onClick={handleBack}
            className="mt-2 text-label-md text-primary hover:underline"
          >
            ← Voltar ao curso
          </button>
        </div>
      </div>
    );
  }

  // Dados extraídos do resource 
  const course     = lesson?.module?.course ?? null;
  const module     = lesson?.module     ?? null;
  const instructor = lesson?.instructor ?? null;

  return (
    <div className="min-h-screen bg-[#120d0a] flex flex-col">
      {/* ── Banner de Preview para o instrutor ─ */}
      <PreviewBanner />
      {/* ── Conteúdo principal ─ */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-6">
       <LessonHeader onBack={handleBack} courseName={lesson?.module?.title} />
       <LessonContent lesson={lesson} />
       <InfoCard lesson={lesson} module={module} instructor={instructor} /> 
      </main>
    </div>
  );
}


