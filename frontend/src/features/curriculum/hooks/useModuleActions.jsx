// src/hooks/useModuleActions.jsx
import { useState, useRef, useEffect } from "react";
import { moduleService } from "@/features/curriculum/services/moduleService";

export function useModuleActions(module, onUpdate, onDelete) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(module.title);
  const [savingTitle, setSavingTitle] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingTitle) titleRef.current?.focus();
  }, [editingTitle]);

  const handleTitleSave = async () => {
    const trimmed = titleValue.trim();

    if (!trimmed || trimmed === module.title) {
      setTitleValue(module.title);
      setEditingTitle(false);
      return;
    }

    try {
      setSavingTitle(true);
      await moduleService.updateModule(module.id, { title: trimmed });
      onUpdate(module.id, { title: trimmed });
    } catch {
      setTitleValue(module.title);
    } finally {
      setSavingTitle(false);
      setEditingTitle(false);
    }
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") handleTitleSave();
    if (event.key === "Escape") {
      setTitleValue(module.title);
      setEditingTitle(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remover "${module.title}" e todas as suas aulas?`)) return;

    try {
      setDeleting(true);
      await moduleService.deleteModule(module.id);
      onDelete(module.id);
    } catch {
      setDeleting(false);
    }
  };

  return {
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
  };
}