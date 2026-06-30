// src/components/instructor/CurriculumStep.jsx
import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { moduleService } from "@/features/curriculum/services/moduleService";
import { ModuleCard } from "@/features/curriculum/components/ModuleCard";
import { Button } from "@/components/ui/Button";

export function CurriculumStep({ courseId }) {
  const [modules, setModules] = useState([]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // ── Módulos ──────────────────────────────────────────────────────────────

  const handleAddModule = async () => {
    try {
      setAdding(true);
      setError(null);
      const newModule = await moduleService.createModule(courseId, {
        title: `Módulo ${modules.length + 1}`,
        position: modules.length + 1,
      });
      setModules((prev) => [...prev, { ...newModule, lessons: [], expanded: true }]);
    } catch {
      setError("Não foi possível adicionar o módulo.");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateModule = useCallback((moduleId, updatedData) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, ...updatedData } : m))
    );
  }, []);

  const handleDeleteModule = useCallback((moduleId) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  }, []);

  const handleToggleExpand = useCallback((moduleId) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, expanded: !m.expanded } : m))
    );
  }, []);

  // ── Reordenação de módulos ────────────────────────────────────────────────

  const handleModuleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = modules.findIndex((m) => m.id === active.id);
    const newIndex = modules.findIndex((m) => m.id === over.id);
    const reordered = arrayMove(modules, oldIndex, newIndex);

    setModules(reordered);

    try {
      await moduleService.reorderModules(
        courseId,
        reordered.map((m, i) => ({ id: m.id, position: i + 1 }))
      );
    } catch {
      // Reverte silenciosamente em caso de falha
      setModules(modules);
    }
  };

  // ── Aulas (delegado ao ModuleCard, mas o estado sobe aqui) ────────────────

  const handleLessonsChange = useCallback((moduleId, lessons) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, lessons } : m))
    );
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-lg text-on-surface">Currículo do Curso</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Organize seus módulos e aulas. Arraste e solte para reordenar.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<span className="material-symbols-outlined text-sm">add</span>}
          onClick={handleAddModule}
          disabled={adding}
        >
          {adding ? "Adicionando..." : "Adicionar Novo Módulo"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Lista de módulos com DnD */}
      {modules.length === 0 ? (
        <EmptyState onAdd={handleAddModule} adding={adding} />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleModuleDragEnd}
        >
          <SortableContext
            items={modules.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  courseId={courseId}
                  onUpdate={handleUpdateModule}
                  onDelete={handleDeleteModule}
                  onToggleExpand={handleToggleExpand}
                  onLessonsChange={handleLessonsChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function EmptyState({ onAdd, adding }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-outline-variant rounded-xl text-center gap-4">
      <span className="material-symbols-outlined text-5xl text-on-surface-variant">
        library_books
      </span>
      <div>
        <p className="text-body-lg text-on-surface">Nenhum módulo ainda</p>
        <p className="text-body-md text-on-surface-variant mt-1">
          Adicione o primeiro módulo para começar a estruturar seu curso.
        </p>
      </div>
      <Button variant="primary" size="md" onClick={onAdd} disabled={adding}>
        Adicionar Módulo
      </Button>
    </div>
  );
}