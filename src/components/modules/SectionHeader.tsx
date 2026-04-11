import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  theme?: "dark" | "white" | "cream";
  className?: string;
  headingId?: string;
  /** When true, adds data-anim-header to each child so the parent
   *  module's CSS animation cascade can stagger them in. */
  animated?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  alignment = "left",
  theme = "cream",
  className,
  headingId,
  animated = false,
}: SectionHeaderProps) {
  const displayTitle = titleHighlight
    ? title.replace(titleHighlight, `__HIGHLIGHT__`)
    : title;
  const highlightClass = theme === "dark" ? "text-gold" : "text-teal";
  const animAttr = animated ? { "data-anim-header": true } : {};

  return (
    <div className={cn(alignment === "center" && "text-center", className)}>
      {eyebrow && (
        <div
          {...animAttr}
          className={cn(
            "eyebrow mb-5 flex items-center gap-3",
            alignment === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 {...animAttr} id={headingId} className="section-title mb-5">
        {displayTitle.split("__HIGHLIGHT__").map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && titleHighlight && <em className={highlightClass}>{titleHighlight}</em>}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          {...animAttr}
          className={cn(
            "section-subtitle max-w-[560px]",
            alignment === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
