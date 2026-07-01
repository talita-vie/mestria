// src/components/instructor/LessonRow.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MDEditor from "@uiw/react-md-editor";

// 1. COMPONENTE PRINCIPAL (Gerencia DnD e alterna os modos)
export function LessonRow({ lesson, moduleId, courseId, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(lesson.editing ?? false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {editing ? (
        <LessonEditForm 
          lesson={lesson} 
          onSave={async (data) => { await onUpdate(lesson.id, data); setEditing(false); }} 
          onCancel={() => setEditing(false)} 
        />
      ) : (
        <LessonView 
          lesson={lesson} 
          moduleId={moduleId} 
          courseId={courseId} 
          onEdit={() => setEditing(true)} 
          onDelete={() => onDelete(lesson.id)} 
          dragHandleProps={{ attributes, listeners }} 
        />
      )}
    </div>
  );
}

// 2. COMPONENTE DE EDIÇÃO (Formulário)
function LessonEditForm({ lesson, onSave, onCancel }) {
  const [title, setTitle] = useState(lesson.title);
  const [videoUrl, setVideoUrl] = useState(lesson.type === "video" ? lesson.content?.url ?? "" : "");
  const [fileUrl, setFileUrl] = useState(lesson.type === "attachment" ? lesson.content?.file_url ?? "" : "");
  const [text, setText] = useState(lesson.type === "text" ? lesson.content?.text ?? "" : "");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const handleSubmit = async () => {
    if (!title.trim()) return onCancel();
    setSaving(true);
    await onSave({ 
      title: title.trim(),
      type: lesson.type,
      video_url: videoUrl.trim(),
      file_url: fileUrl.trim(),
      text: text.trim()
    });
    setSaving(false);
  };

  const handleKeyDown = (e) => e.key === "Escape" && onCancel();

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-surface-container-highest border border-primary/30">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={saving}
        placeholder="Título da aula"
        className="w-full bg-transparent border-b border-outline-variant text-body-md text-on-surface outline-none pb-0.5 focus:border-primary"
      />
      {lesson.type === "video" && ( 
        <input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={saving}
          placeholder="URL do vídeo (ex: Youtube, Vimeo)"
          className="w-full bg-transparent border-b border-outline-variant text-body-sm text-on-surface-variant outline-none pb-0.5 focus:border-primary"
        />
      )}

      {lesson.type === "attachment" && ( 
        <input
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={saving}
          placeholder="URL do arquivo (PDF, Imagem)"
          className="w-full bg-transparent border-b border-outline-variant text-body-sm text-on-surface-variant outline-none pb-0.5 focus:border-primary"
        />
      )}

      {lesson.type === "text" && (
      <div data-color-mode="light" onKeyDown={handleKeyDown}>
        <MDEditor
          value={text}
          onChange={(val) => setText(val ?? "")}
          height={400}
          preview="live"
        />
      </div>
    )}

      <div className="flex justify-end gap-2 mt-1">
        <button onClick={onCancel} disabled={saving} className="text-label-sm px-2 py-1 text-on-surface-variant hover:text-on-surface">Cancelar</button>
        <button onClick={handleSubmit} disabled={saving || !title.trim()} className="text-label-sm text-primary px-2 py-1 disabled:opacity-40">
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}

// 3. COMPONENTE DE VISUALIZAÇÃO (Barra de leitura interativa)
function LessonView({ lesson, moduleId, courseId, onEdit, onDelete, dragHandleProps }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Remover "${lesson.title}"?`)) return;
    setDeleting(true);
    try { await onDelete(); } catch { setDeleting(false); }
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest group transition-colors">
      <button className="cursor-grab touch-none text-on-surface-variant/50 hover:text-on-surface-variant" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
        <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
      </button>
      
      <span className="material-symbols-outlined text-[18px] text-on-surface-variant flex-shrink-0">
        {lesson.type === "video" ? "play_circle" : "article"}
      </span>
      
      <span className="flex-1 text-body-sm truncate text-on-surface">{lesson.title}</span>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => navigate(`/instrutor/cursos/${courseId}/modulos/${moduleId}/aulas/${lesson.id}/previa`)} className="p-1 hover:text-primary">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
        </button>
        <button onClick={onEdit} className="p-1 hover:text-on-surface text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">edit</span>
        </button>
        <button onClick={handleDelete} disabled={deleting} className="p-1 hover:text-error text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>
    </div>
  );
}