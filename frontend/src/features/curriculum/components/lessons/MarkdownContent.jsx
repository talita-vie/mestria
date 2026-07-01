import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ text }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-headline-lg text-white mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-headline-md text-white mb-3 mt-6">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-body-lg font-semibold text-white mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-body-md text-white/70 leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-body-md text-white/70 mb-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-body-md text-white/70 mb-4 space-y-1">{children}</ol>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ) : (
            <pre className="bg-white/10 rounded-lg p-4 overflow-x-auto mb-4">
              <code className="text-sm font-mono text-white/80">{children}</code>
            </pre>
          ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-primary pl-4 text-white/60 italic mb-4">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
