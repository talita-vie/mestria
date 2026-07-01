export function AttachmentCard ({url, title }) {
    return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-8 flex flex-col items-center gap-4 text-center">
      <span className="material-symbols-outlined text-5xl text-primary">
        attach_file
      </span>
      <div>
        <p className="text-body-lg text-white font-medium">{title}</p>
        <p className="text-label-md text-white/50 mt-1">Arquivo anexo</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary text-label-md hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">download</span>
        Baixar Arquivo
      </a>
    </div>
    );
}