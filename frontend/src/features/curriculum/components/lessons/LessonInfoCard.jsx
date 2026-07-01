import { InstructorCard } from "./InstructorCard";

export function InfoCard ({lesson, module, instructor}) {

    return (
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* Esquerda: módulo + título + descrição */}
          <div className="flex flex-col gap-2 flex-1">
            {module && (
              <span className="text-label-sm text-primary uppercase tracking-wider font-medium">
                Módulo {module.position} — {module.title}
              </span>
            )}
            <h1 className="text-headline-lg text-white">
              {lesson?.title}
            </h1>
            {lesson?.description && (
              <p className="text-body-md text-white/60 leading-relaxed">
                {lesson.description}
              </p>
            )}
          </div>

          {/* Direita: ações + card instrutor */}
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-label-md text-white/70 hover:bg-white/15 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              Discutir Aula
            </button>

            {/* Card do instrutor */}
            {instructor && (<InstructorCard instructor={instructor}/> )}
          </div>
        </div>
)}