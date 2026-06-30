// src/pages/instructor/CreateCourse.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "@/features/category/hooks/useCategory";
import { courseService } from "@/features/course/services/courseService";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Dropzone } from "@/components/ui/Dropzone";
import { Stepper } from "@/components/ui/Stepper";
import { BentoSection } from "@/features/course/components/BentoSection";
import { CurriculumStep } from "@/features/curriculum/components/CurriculumStep";

const STEPS_CONFIG = [
  { id: 1, label: "Informações Básicas" },
  { id: 2, label: "Mídia de Capa" },
  { id: 3, label: "Currículo do Curso" },
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [deleting, setDeleting] = useState(false);

  // Dados dos steps 1 e 2
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: null,
  });

  // Preview da thumbnail
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // ID do curso criado na transição step 2 → 3
  const [courseId, setCourseId] = useState(null);

  // Estados de loading/erro
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { categories, loading: loadingCategories } = useCategory();

  const categoryOptions = [
    {
      value: "",
      label: loadingCategories ? "Carregando..." : "Selecione uma categoria",
      disabled: true,
    },
    ...categories,
  ];

  // ── Handlers de input ───────────────────────────────────────────────────

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleDelete = async (courseId) => {
    console.log("Tentando excluir:", courseId);
    setDeleting(true);
    await courseService.deleteCourse(courseId);
    navigate("/instrutor/cursos");
  };
  

  // ── Navegação entre steps ───────────────────────────────────────────────

  const prevStep = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleContinue = async () => {
    setError(null);

    // Step 1 → 2: apenas navega
    if (currentStep === 1) {
      if (!formData.title.trim() || !formData.category) {
        setError("Preencha o título e a categoria antes de continuar.");
        return;
      }
      setCurrentStep(2);
      return;
    }

    // Step 2 → 3: cria o curso na API
    if (currentStep === 2) {
      try {
        setSubmitting(true);
        const { course } = await courseService.createCourse(formData);
        setCourseId(course.id);
        setCurrentStep(3);
      } catch (err) {
        setError(
          err.response?.data?.message ?? "Erro ao criar o curso. Tente novamente."
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Step 3: concluir e ir para a lista de cursos
    navigate("/instrutor/cursos");
  };

  const isLastStep = currentStep === STEPS_CONFIG.length;

  const stepHeaderText = {
    1: { title: "Crie um Novo Curso", subtitle: "Configure os detalhes básicos da sua nova oferta educacional." },
    2: { title: "Mídia de Capa", subtitle: "Dê apelo visual do seu curso com uma imagem de alta qualidade." },
    3: { title: "Currículo do Curso", subtitle: "Organize seus módulos e aulas. Arraste e solte para reordenar." },
  };

  return (
    <main className="flex-1 flex flex-col relative pb-24">
      {/* Breadcrumb */}
      <div className="hidden md:flex items-center justify-between px-10 h-16 border-b border-outline-variant bg-surface sticky top-0 z-30">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm">
          <a className="hover:text-on-surface transition-colors" href="/instrutor/cursos">
            Meus Cursos
          </a>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface">Criar Novo Curso</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 md:px-10 py-8 md:py-12 flex-1">
        {/* Header do step atual */}
        {currentStep < 3 && (
          <header className="mb-10 text-center md:text-left">
            <h2 className="text-headline-lg-mobile md:text-display-lg text-on-surface mb-2">
              {stepHeaderText[currentStep].title}
            </h2>
            <p className="text-body-md text-on-surface-variant">
              {stepHeaderText[currentStep].subtitle}
            </p>
          </header>
        )}

        <Stepper currentStep={currentStep} steps={STEPS_CONFIG} />

        {error && (
          <div className="mt-6 px-4 py-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
            {error}
          </div>
        )}

        <div className="mt-10">
          {/* Step 1 — Informações Básicas */}
          {currentStep === 1 && (
            <BentoSection title="Informações Básicas" icon="info">
              <div className="space-y-6">
                <Input
                  id="title"
                  label="Título do Curso"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <Select
                  id="category"
                  label="Categoria"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={loadingCategories}
                />
                <Textarea
                  id="description"
                  label="Descrição Curta"
                  rows={4}
                  maxLength={200}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </BentoSection>
          )}

          {/* Step 2 — Mídia de Capa */}
          {currentStep === 2 && (
            <BentoSection>
              <Dropzone
                id="thumbnail"
                label="Imagem de Capa"
                description="Aparece nos resultados de busca do catálogo."
                onFileSelect={handleFileSelect}
                requirements={[
                  { icon: "aspect_ratio", text: "1280x720px (16:9)" },
                  { icon: "draft", text: "PNG ou JPG" },
                ]}
              />

              {/* Preview da thumbnail */}
              {thumbnailPreview && (
                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Pré-visualização
                  </p>
                  <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-outline-variant aspect-video">
                    <img
                      src={thumbnailPreview}
                      alt="Pré-visualização da capa"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setThumbnailPreview(null);
                        setFormData((prev) => ({ ...prev, thumbnail: null }));
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-scrim/60 hover:bg-scrim/80 text-white transition-colors"
                      aria-label="Remover imagem"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              )}
            </BentoSection>
          )}

          {/* Step 3 — Currículo */}
          {currentStep === 3 && courseId && (
            <CurriculumStep courseId={courseId} />
          )}
        </div>
      </div>

      {/* Footer fixo */}
      <footer className="fixed bottom-0 md:left-[288px] right-0 bg-surface-container/95 backdrop-blur-md border-t border-outline-variant py-4 px-4 md:px-10 z-30 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {currentStep === 1 ? (
          <Button
            variant="ghost"
            size="md"
            className="border-outline-variant text-on-surface"
            onClick={() => handleDelete(courseId)}
          >
            Cancelar
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="md"
            className="border-outline-variant text-on-surface"
            leftIcon={<span className="material-symbols-outlined text-sm">arrow_back</span>}
            onClick={prevStep}
            disabled={submitting}
          >
            Voltar
          </Button>
        )}

        <Button
          variant="primary"
          size="md"
          rightIcon={
            !isLastStep && (
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            )
          }
          onClick={handleContinue}
          disabled={submitting}
        >
          {submitting
            ? "Salvando..."
            : isLastStep
            ? "Concluir"
            : currentStep === 2
            ? "Salvar e Continuar"
            : "Continuar"}
        </Button>
      </footer>
    </main>
  );
}