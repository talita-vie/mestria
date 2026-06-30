// src/components/ui/Dropzone.jsx
import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function Dropzone({
  id: externalId,
  label,
  description,
  requirements = [],
  onFileSelect,
  accept = "image/png, image/jpeg",
  className = "",
}) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col">
        <h4 className="text-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">image</span>
          {label}
        </h4>
        {description && (
          <p className="text-label-sm text-on-surface-variant mt-1">{description}</p>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "relative flex flex-col items-center justify-center p-10 mt-2",
          "border-2 border-dashed rounded-xl transition-colors duration-200",
          isDragging
            ? "border-primary-container bg-primary-container/5"
            : "border-outline-variant bg-surface-container-lowest/50 hover:bg-surface-container-lowest",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />

        <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">
          cloud_upload
        </span>

        <p className="text-body-md text-on-surface mb-1">
          Arraste e solte a imagem aqui
        </p>
        <p className="text-label-sm text-on-surface-variant mb-6">
          ou clique para procurar no seu computador
        </p>

        <Button
          variant="ghost"
          size="md"
          className="bg-surface-container-high border-none text-on-surface hover:bg-surface-variant"
          onClick={() => inputRef.current?.click()}
        >
          Selecionar Arquivo
        </Button>

        {requirements.length > 0 && (
          <div className="mt-8 p-4 rounded-lg bg-surface-container-high/50 border border-outline-variant/30 text-left w-full max-w-sm">
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">
              Requisitos
            </p>
            <ul className="flex flex-col gap-1 text-label-sm text-on-surface">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    {req.icon}
                  </span>
                  {req.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}