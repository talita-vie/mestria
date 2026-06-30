// src/components/shared/VideoPlayer.jsx
import { useState } from "react";

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseVideoUrl(url) {
  if (!url) return null;

  // YouTube — suporta watch?v=, youtu.be/, embed/, shorts/
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      provider: "youtube",
      id: ytMatch[1],
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`,
    };
  }

  // Vimeo — suporta vimeo.com/{id} e player.vimeo.com/video/{id}
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      provider: "vimeo",
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      // Thumbnail via oEmbed — resolvida assincronamente no componente
      thumbnailUrl: null,
    };
  }

  return null;
}

// ── Componente principal ───────────────────────────────────────────────────────

export function VideoPlayer({ url, title, className = "" }) {
  const [playing, setPlaying] = useState(false);
  const video = parseVideoUrl(url);

  if (!video) {
    return (
      <div className={`flex items-center justify-center aspect-video bg-surface-container rounded-xl ${className}`}>
        <p className="text-body-md text-on-surface-variant">URL de vídeo inválida.</p>
      </div>
    );
  }

  if (playing) {
    return (
      <div className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={video.embedUrl}
          title={title ?? "Vídeo da aula"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <Thumbnail
      video={video}
      title={title}
      className={className}
      onPlay={() => setPlaying(true)}
    />
  );
}

// ── Thumbnail com botão play ───────────────────────────────────────────────────

function Thumbnail({ video, title, className, onPlay }) {
  const [thumbError, setThumbError] = useState(false);
  const [vimeoThumb, setVimeoThumb] = useState(null);

  // Busca thumbnail do Vimeo via oEmbed (não precisa de autenticação)
  if (video.provider === "vimeo" && !vimeoThumb) {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.id}`)
      .then((r) => r.json())
      .then((data) => setVimeoThumb(data.thumbnail_url))
      .catch(() => {});
  }

  const thumbnailUrl =
    video.provider === "youtube"
      ? video.thumbnailUrl
      : vimeoThumb;

  return (
    <div
      className={`relative aspect-video w-full rounded-xl overflow-hidden bg-surface-container-high cursor-pointer group ${className}`}
      onClick={onPlay}
      role="button"
      aria-label={`Reproduzir: ${title ?? "vídeo"}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay()}
    >
      {/* Thumbnail */}
      {thumbnailUrl && !thumbError ? (
        <img
          src={thumbnailUrl}
          alt={title ?? "Thumbnail do vídeo"}
          onError={() => setThumbError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-high" />
      )}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200" />

      {/* Botão play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all duration-200 shadow-lg">
          <span className="material-symbols-outlined text-on-primary text-3xl translate-x-0.5">
            play_arrow
          </span>
        </div>
      </div>

      {/* Badge do provedor */}
      <div className="absolute bottom-3 right-3">
        <span className="text-label-xs text-white/70 bg-black/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {video.provider}
        </span>
      </div>
    </div>
  );
}