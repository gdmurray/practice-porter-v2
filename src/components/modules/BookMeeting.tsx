import { SectionHeader } from "./SectionHeader";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";

export interface BookMeetingProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  moduleLayout?: ModuleLayoutValue | null;
}

export function BookMeeting({
  theme = "white",
  eyebrow,
  title,
  subtitle,
  moduleLayout,
}: BookMeetingProps) {
  const animated = moduleLayout?.animated ?? false;
  const bookingUrl = import.meta.env.PUBLIC_GOOGLE_CALENDAR_BOOKING_URL as string | undefined;

  return (
    <section
      id="book-meeting"
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "book-meeting-heading" : undefined}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      <div className="pp-container">
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ""}
            subtitle={subtitle}
            alignment="center"
            theme={
              theme as
                | "white"
                | "lotion"
                | "cream"
                | "vanilla"
                | "red"
                | "gradient"
            }
            className="mb-12"
            headingId="book-meeting-heading"
            animated={animated}
          />
        )}
        {bookingUrl && (
          <iframe
            src={bookingUrl}
            style={{ border: 0 }}
            className="mx-auto w-full"
            width="100%"
            height={700}
            frameBorder={0}
            title="Book a meeting"
          />
        )}
      </div>
    </section>
  );
}
