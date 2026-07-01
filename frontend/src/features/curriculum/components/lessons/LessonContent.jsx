import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { MarkdownContent } from "./MarkdownContent";
import { AttachmentCard } from "./AttachmentCard";

export function LessonContent({ lesson }) {
  if (!lesson) return null;

  switch (lesson.type) {
    case "video":
      return (
        <VideoPlayer
          url={lesson.content?.url ?? ""}
          title={lesson.title}
          className="shadow-2xl"
        />
      );

    case "text":
      return (
        <div className="rounded-xl bg-white/5 border border-white/10 p-8">
          <MarkdownContent
            text={lesson.content?.text ?? ""}
          />
        </div>
      );

    case "attachment":
      return (
        <AttachmentCard
          url={lesson.content?.file_url}
          title={lesson.title}
        />
      );

    default:
      return null;
  }
}