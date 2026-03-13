"use client";

import { SectionHeader } from "./SectionHeader";

export interface AboutValue {
  title?: string;
  desc?: string;
}

export interface AboutProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  body?: { _type: string; children?: { text: string }[] }[];
  image?: {
    image?: { asset?: { url?: string } };
    name?: string;
    role?: string;
    initials?: string;
  };
  values?: AboutValue[];
}

export function About({
  theme = "cream",
  eyebrow = "About Practice Porter",
  title = "Boutique Service, Enterprise Results",
  titleHighlight = "Enterprise",
  lead,
  body,
  image,
  values = [],
}: AboutProps) {
  const bodyText = body?.map((b) => b.children?.map((c) => c.text).join("")).join("\n\n") || "";

  return (
    <section data-theme={theme} id="about" className="pp-section relative bg-off-white">
      <div className="pp-container">
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div className="reveal-left flex min-h-[480px] items-center justify-center overflow-hidden rounded-[20px] bg-midnight">
            {image?.image?.asset?.url ? (
              <img
                src={image.image.asset.url}
                alt={image.name || ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="relative z-1 text-center text-white">
                <div className="mx-auto mb-6 flex size-[100px] items-center justify-center rounded-full border-2 border-gold">
                  <span className="font-serif text-4xl font-bold text-gold">
                    {image?.initials || "S"}
                  </span>
                </div>
                <div className="mb-2 font-serif text-[32px] font-bold">{image?.name || "Shaan Brach"}</div>
                <div className="text-sm tracking-[2px] uppercase text-white/50">
                  {image?.role || "Founder, Practice Porter"}
                </div>
              </div>
            )}
          </div>
          <div className="reveal-right">
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              titleHighlight={titleHighlight}
              theme={theme as Theme}
            />
            {lead && (
              <p className="mb-6 font-serif text-2xl font-normal leading-normal text-midnight">
                {lead}
              </p>
            )}
            {bodyText && (
              <div className="space-y-5 text-base leading-[1.8] text-mid-gray">
                {bodyText.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-9 flex gap-6">
              {values.map((v, i) => (
                <div key={i} className="flex-1 border-t-2 border-gold pt-5">
                  <div className="mb-1.5 text-sm font-bold text-midnight">{v.title}</div>
                  <div className="text-[13px] leading-normal text-mid-gray">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
