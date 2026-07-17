"use client";

import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { CalendarClock } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
import { makeSplitBookingComponents } from "./SplitBooking/makeSplitBookingComponents";

export interface SplitBookingProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  moduleLayout?: ModuleLayoutValue | null;
  content?: PortableTextBlock[] | null;
}

export function SplitBooking({
  theme = "cream",
  eyebrow,
  title,
  subtitle,
  moduleLayout,
  content,
}: SplitBookingProps) {
  const animated = moduleLayout?.animated ?? false;
  const bookingUrl = import.meta.env.PUBLIC_GOOGLE_CALENDAR_BOOKING_URL as
    | string
    | undefined;
  const components = makeSplitBookingComponents(animated);

  return (
    <section
      id="split-booking"
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "split-booking-heading" : undefined}
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
            headingId="split-booking-heading"
            animated={animated}
          />
        )}

        <div className="grid overflow-hidden rounded-[18px] shadow-[0_26px_64px_rgba(43,26,20,0.18)] md:grid-cols-[1.05fr_1fr]">
          <div className="bg-red px-8 py-11 md:px-[52px] md:py-[54px]">
            {content?.length ? (
              <div className="space-y-4">
                <PortableText value={content} components={components} />
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-center bg-white p-9">
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                style={{ border: 0 }}
                className="w-full"
                width="100%"
                height={600}
                frameBorder={0}
                title="Book a meeting"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center text-charcoal/35">
                <CalendarClock className="size-10" strokeWidth={1.4} />
                <span className="text-sm font-medium tracking-wide">
                  Calendar scheduler not configured
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
