// src/hooks/useModuleLessons.jsx
import { useState } from "react";
import { lessonService } from "@/features/curriculum/services/lessonService";

export function useModuleLessons(moduleId, initialLessons, onLessonsChange) {
  const [addingLesson, setAddingLesson] = useState(false);
  const [lessons, setLessons] = useState(initialLessons || []);

  const addLesson = async (data) => {
    setAddingLesson(true);
    try {
      const newLesson = await lessonService.createLesson(moduleId, data, lessons);
      const updatedLessons = [...lessons, newLesson];
      setLessons(updatedLessons);
      onLessonsChange?.(moduleId, updatedLessons);
    } catch (error) {
      console.error("Erro ao adicionar aula", error);
    } finally {
      setAddingLesson(false);
    }
  };

  const updateLesson = async (lessonId, data) => {

      const updated = await lessonService.updateLesson(lessonId, data);
      const updatedLessons = lessons.map((l) => (l.id === lessonId ? updated : l));
      setLessons(updatedLessons);
      onLessonsChange?.(moduleId, updatedLessons);
  };

  const deleteLesson = async (lessonId) => {

      await lessonService.deleteLesson(lessonId);
      const updatedLessons = lessons.filter((l) => l.id !== lessonId);
      setLessons(updatedLessons);
      onLessonsChange?.(moduleId, updatedLessons);
  };

  const reorderLessons = async (activeId, overId) => {
    const oldIndex = lessons.findIndex((l) => l.id === activeId);
    const newIndex = lessons.findIndex((l) => l.id === overId);
    
    if (oldIndex === newIndex) return;

    const newLessons = [...lessons];
    const [moved] = newLessons.splice(oldIndex, 1);
    newLessons.splice(newIndex, 0, moved);
    
    setLessons(newLessons);
    onLessonsChange?.(moduleId, newLessons);

    try {
      const positions = newLessons.map((l, index) => ({ id: l.id, position: index + 1 }));
      await lessonService.reorderLessons(moduleId, positions);
    } catch (error) {
      console.error("Erro ao reordenar", error);
      // Reverter o estado caso a API falhe
      setLessons(lessons); 
      onLessonsChange?.(moduleId, lessons);
    }
  };

  return {
    lessons,
    addingLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
  };
}