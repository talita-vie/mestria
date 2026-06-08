import { useState } from "react";
import { useCourses } from "@/hooks/useCourse";
import { CoursesHeader } from "@/components/instructor/CoursesHeader";
import { CourseCard } from "@/components/instructor/CourseCard";
import { StatusBadge } from "@/components/instructor/StatusBadge";
import { CoursesFilter } from "@/components/instructor/CourseFilter";
import { FilterButton } from "@/components/instructor/FilterButton";

export default function MyCourses() {
  const { courses, loading, error } = useCourses();
  
  // Estado para controlar o filtro 
  const [activeFilter, setActiveFilter] = useState("all");

  if (loading) {
    return (
      <div className="p-8 text-body-md text-on-surface-variant">
        Carregando cursos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-error bg-error-container/10 rounded-lg m-8">
        {error}
      </div>
    );
  }

  const filteredCourses = courses?.filter((course) => {
    if (activeFilter === "all") return true;
    return course.status === activeFilter;
  });

  return (
    <main className="p-8">
      <CoursesHeader />

      <CoursesFilter className="mt-6">
        <FilterButton
          onClick={() => setActiveFilter("all")}
          className={
            activeFilter === "all"
              ? "bg-primary-container text-on-primary"
              : "bg-surface border border-outline-variant text-on-surface"
          }
        >
          Todos
        </FilterButton>
        <FilterButton
          onClick={() => setActiveFilter("published")}
          className={
            activeFilter === "published"
              ? "bg-primary text-on-primary"
              : "bg-surface border border-outline-variant text-on-surface"
          }
        >
          Publicados
        </FilterButton>
        <FilterButton
          onClick={() => setActiveFilter("draft")}
          className={
            activeFilter === "draft"
              ? "bg-primary text-on-primary"
              : "bg-surface border border-outline-variant text-on-surface"
          }
        >
          Rascunhos
        </FilterButton>
      </CoursesFilter>

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={
                <img
                  src={course.thumbnail || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              }
              badge={
                <StatusBadge
                  label={course.status === "published" ? "Publicado" : "Rascunho"}
                  className={
                    course.status === "published"
                      ? "border-success/30 bg-success-container/10 text-success"
                      : "border-outline bg-surface-container text-primary-container"
                  }
                />
              }
              onMenuClick={() => console.log("Ações do curso:", course.id)}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-outline-variant bg-surface-container p-8 text-center text-body-md text-on-surface-variant">
            Nenhum curso encontrado para este filtro.
          </div>
        )}
      </section>
    </main>
  );
}