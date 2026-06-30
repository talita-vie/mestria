// src/components/instructor/ModuleCard.jsx
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { LessonRow } from "@/features/curriculum/components/lessons/LessonRow";
import { useModuleLessons } from "@/features/curriculum/hooks/useModuleLessons";
import { useModuleActions } from "@/features/curriculum/hooks/useModuleActions";

export function ModuleCard({ courseId, module, onUpdate, onDelete, onToggleExpand, onLessonsChange }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: module.id,
  });

  const {
    lessons,
    addingLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
  } = useModuleLessons(module.id, module.lessons, onLessonsChange);

  const {
    editingTitle,
    setEditingTitle,
    titleValue,
    setTitleValue,
    savingTitle,
    deleting,
    titleRef,
    handleTitleSave,
    handleTitleKeyDown,
    handleDelete,
  } = useModuleActions(module, onUpdate, onDelete);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  const handleLessonDragEnd = ({ active, over }) => {
    if (over) reorderLessons(active.id, over.id);
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl overflow-hidden border border-outline-variant bg-surface-container">
      <div className="flex items-center gap-3 px-4 py-4 bg-surface-container-high">
        <button className="cursor-grab active:cursor-grabbing text-on-surface-variant hover:text-on-surface transition-colors touch-none" {...attributes} {...listeners}>
          <span className="material-symbols-outlined text-xl">drag_indicator</span>
        </button>

        <div className="flex-1 min-w-0">
          {editingTitle ? (
            <input
              ref={titleRef}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              disabled={savingTitle}
              className="w-full bg-transparent border-b border-primary outline-none"
            />
          ) : (
            <button onClick={() => setEditingTitle(true)} className="text-left w-full">
              {module.title}
            </button>
          )}

          <p className="text-label-sm text-on-surface-variant">
            {lessons.length === 0 ? "Nenhuma aula" : `${lessons.length} ${lessons.length === 1 ? "Aula" : "Aulas"}`}
          </p>
        </div>

        <div className="flex gap-1">
          <button onClick={handleDelete} disabled={deleting}>
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button onClick={() => onToggleExpand(module.id)}>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>

      {module.expanded && (
        <div className="px-4 pb-4 pt-2">
          {lessons.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleLessonDragEnd}>
              <SortableContext items={lessons.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-1 mb-2">
                  {lessons.map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} moduleId={module.id} courseId={courseId} onUpdate={updateLesson} onDelete={deleteLesson} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
          
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-outline-variant">
            <span className="text-label-sm text-on-surface-variant mr-auto">Adicionar:</span>
            
            <button 
              onClick={() => addLesson({ title: "Nova Aula de Vídeo", type: "video" })} 
              disabled={addingLesson}
              className="px-3 py-1.5 text-label-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Vídeo
            </button>
            
            <button 
              onClick={() => addLesson({ title: "Nova Aula de Texto", type: "text" })} 
              disabled={addingLesson}
              className="px-3 py-1.5 text-label-sm rounded-md bg-surface-container-highest hover:bg-surface-container-highest/80 transition-colors"
            >
              Texto
            </button>
            
            <button 
              onClick={() => addLesson({ title: "Novo Anexo", type: "attachment" })} 
              disabled={addingLesson}
              className="px-3 py-1.5 text-label-sm rounded-md bg-surface-container-highest hover:bg-surface-container-highest/80 transition-colors"
            >
              Anexo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}