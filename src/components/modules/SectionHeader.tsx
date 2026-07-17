import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  theme?: "white" | "lotion" | "cream" | "vanilla" | "red" | "gradient";
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
  theme = "lotion",
  className,
  headingId,
  animated = false,
}: SectionHeaderProps) {
  const displayTitle = titleHighlight
    ? title.replace(titleHighlight, `__HIGHLIGHT__`)
    : title;

  const isDark = theme === "red" || theme === "gradient";
  const highlightClass = isDark ? "text-vanilla" : "text-red";
  const animAttr = animated ? { "data-anim-header": true } : {};

  return (
    <div className={cn(alignment === "center" && "text-center", className)}>
      {eyebrow && (
        <div
          {...animAttr}
          className={cn(
            "eyebrow mb-5",
            alignment === "center" && "text-center"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 {...animAttr} id={headingId} className="section-title mb-5">
        {displayTitle.split("__HIGHLIGHT__").map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && titleHighlight && (
              <em className={cn("font-normal", highlightClass)}>{titleHighlight}</em>
            )}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          {...animAttr}
          className={cn(
            "section-subtitle max-w-[700px]",
            alignment === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
