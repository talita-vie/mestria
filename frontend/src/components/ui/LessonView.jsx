// src/components/ui/LessonView.jsx
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Props:
 *  lesson     — { id, title, type, content: { url }, description }
 *  course     — { title }
 *  module     — { position, title }
 *  instructor — { name, avatar, role }
 *  onBack     — callback para voltar ao curso
 */
export default function LessonView({ lesson, course, module, instructor, onBack }) {
  const videoUrl = lesson?.content?.url ?? null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 h-14 border-b border-outline-variant bg-surface/95 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Voltar ao Curso
        </button>

        <span className="text-label-lg font-semibold text-on-surface">Mestria</span>

        <button className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
          Ajuda
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Player de vídeo */}
        {lesson?.type === "video" && videoUrl && (
          <VideoPlayer
            url={videoUrl}
            title={lesson.title}
            className="shadow-2xl"
          />
        )}

        {/* Conteúdo texto */}
    {lesson?.type === "text" && lesson?.content?.body && (
    <div className="rounded-xl bg-surface-container border border-outline-variant/40 p-8">
        <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            h1: ({ children }) => <h1 className="text-headline-lg text-on-surface mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-headline-md text-on-surface mb-3 mt-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-title-lg text-on-surface mb-2 mt-4">{children}</h3>,
            p:  ({ children }) => <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside text-body-md text-on-surface-variant mb-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside text-body-md text-on-surface-variant mb-4 space-y-1">{children}</ol>,
            code: ({ inline, children }) => inline
            ? <code className="bg-surface-container-high text-primary px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
            : <pre className="bg-surface-container-high rounded-lg p-4 overflow-x-auto mb-4"><code className="text-sm font-mono text-on-surface">{children}</code></pre>,
            blockquote: ({ children }) => <blockquote className="border-l-2 border-primary pl-4 text-on-surface-variant italic mb-4">{children}</blockquote>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>,
        }}
        >
        {lesson.content.body}
        </ReactMarkdown>
    </div>
    )}

        {/* Info da aula */}
        <div className="rounded-xl bg-surface-container border border-outline-variant/40 p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2 flex-1">
            {module && (
              <span className="text-label-sm text-primary uppercase tracking-wider font-medium">
                Módulo {module.position} — {module.title}
              </span>
            )}
            <h1 className="text-headline-lg text-on-surface">
              {lesson?.title}
            </h1>
            {lesson?.description && (
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {lesson.description}
              </p>
            )}
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3 min-w-[180px]">
            <button
              disabled
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant text-label-md text-on-surface-variant opacity-60 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Source Files
            </button>
            <button
              disabled
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant text-label-md text-on-surface-variant opacity-60 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              Discuss Lesson
            </button>

            {/* Instructor card */}
            {instructor && (
              <div className="flex items-center gap-3 mt-2 pt-4 border-t border-outline-variant/30">
                {instructor.avatar ? (
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-label-md font-semibold text-on-surface truncate">
                    {instructor.name}
                  </p>
                  <p className="text-label-sm text-on-surface-variant truncate">
                    {instructor.role ?? "Instrutor"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}