import { MoreVertical } from "lucide-react";

export function CourseCard({
  title,
  description,
  image,
  badge,
  footer,
  onMenuClick,
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container transition-all hover:border-primary-container">
      <div className="relative h-52 overflow-hidden">
        {image}

        <div className="absolute left-4 top-4">
          {badge}
        </div>

        <button
          onClick={onMenuClick}
          className="absolute right-4 top-4 rounded-md bg-surface-container p-2"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-headline-md text-on-surface">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-body-md text-on-surface-variant">
          {description}
        </p>

        <footer className="mt-auto border-t border-outline-variant pt-4">
          {footer}
        </footer>
      </div>
    </article>
  );
}