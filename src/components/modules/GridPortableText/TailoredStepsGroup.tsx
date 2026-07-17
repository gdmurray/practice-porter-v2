"use client";

import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { ctaProps, type CtaData } from "@/lib/cta";
import { cn } from "@/lib/utils";

export interface TailoredSolutionLinkValue {
  _key?: string;
  icon?: string;
  cta?: CtaData;
}

export interface TailoredStepValue {
  badge?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: CtaData;
  links?: TailoredSolutionLinkValue[];
}

function StepCard({ step, tone }: { step?: TailoredStepValue; tone: "warm" | "accent" }) {
  if (!step) return null;

  const isAccent = tone === "accent";

  return (
    <div
      className={cn(
        "relative z-1 flex h-full flex-col overflow-hidden rounded-[20px] border p-9 shadow-[0_22px_60px_rgba(43,26,20,0.07)] transition-[transform,box-shadow] duration-300 md:p-[46px_46px_42px]",
        tone === "warm" &&
          "border-[rgba(163,39,5,0.14)] bg-[linear-gradient(158deg,#FFFFFF_0%,#FFF4EC_100%)]",
        isAccent &&
          "border-[rgba(126,30,2,0.5)] bg-[linear-gradient(150deg,#B5330A_0%,var(--red)_52%,var(--red-deep)_100%)] shadow-[0_26px_66px_rgba(126,30,2,0.28)]"
      )}
    >
      <div className="mb-[22px] flex items-center gap-3.5">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full text-[19px] font-semibold leading-none",
            tone === "warm" && "bg-red text-white",
            isAccent && "bg-white text-red"
          )}
        >
          {step.badge ?? "1"}
        </span>
        {step.eyebrow && (
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-[1.6px]",
              tone === "warm" && "text-red",
              isAccent && "text-[#FFD9C7]"
            )}
          >
            {step.eyebrow}
          </span>
        )}
      </div>
      {step.title && (
        <h3
          className={cn(
            "font-serif text-[25px] font-medium leading-tight tracking-[0.2px]",
            tone === "warm" && "text-ink",
            isAccent && "text-white"
          )}
        >
          {step.title}
        </h3>
      )}
      {step.body && (
        <p
          className={cn(
            "mt-3.5 text-base leading-[1.62]",
            tone === "warm" && "text-muted-text",
            isAccent && "text-white/90"
          )}
        >
          {step.body}
        </p>
      )}
      {step.cta?.label && (
        <div className="mt-auto pt-8">
          <Button
            variant="outline"
            size="cta"
            asChild
            className="rounded-xl border-[1.5px] border-red bg-white text-red hover:bg-cream"
          >
            <a {...ctaProps(step.cta)}>{step.cta.label}</a>
          </Button>
        </div>
      )}
      {step.links && step.links.length > 0 && (
        <div className="mt-auto flex flex-col gap-2.5 pt-8 sm:flex-row sm:gap-[11px]">
          {step.links.map((link, i) => {
            const Icon = link.icon ? getIcon(link.icon) : null;
            if (!link.cta?.label) return null;
            return (
              <a
                key={link._key ?? i}
                {...ctaProps(link.cta)}
                className={cn(
                  "group flex min-w-0 flex-1 flex-col items-center gap-3 rounded-[14px] border px-2.5 py-5 text-center transition-[transform,background,border-color,box-shadow] duration-200 hover:-translate-y-0.5",
                  isAccent
                    ? "border-white/28 bg-white/10 hover:border-white/50 hover:bg-white/18 hover:shadow-[0_10px_24px_rgba(126,30,2,0.3)]"
                    : "border-[rgba(163,39,5,0.10)] bg-white hover:border-[rgba(163,39,5,0.26)] hover:bg-cream hover:shadow-[0_10px_24px_rgba(163,39,5,0.10)]"
                )}
              >
                {Icon && (
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105",
                      isAccent
                        ? "bg-white/16 text-white"
                        : "border-[1.5px] border-[rgba(163,39,5,0.25)] bg-white text-red"
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                )}
                <span
                  className={cn(
                    "text-xs font-semibold leading-snug tracking-[-0.1px]",
                    isAccent ? "text-white" : "text-red-deep"
                  )}
                >
                  {link.cta.label}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TailoredStepsGroup({
  value,
  animated = false,
}: {
  value: { stepOne?: TailoredStepValue; stepTwo?: TailoredStepValue };
  animated?: boolean;
}) {
  if (!value.stepOne && !value.stepTwo) return null;

  return (
    <div
      className="relative grid grid-cols-1 gap-[52px] md:grid-cols-2"
      {...(animated ? { "data-anim-list": true } : {})}
    >
      <StepCard step={value.stepOne} tone="warm" />
      <StepCard step={value.stepTwo} tone="accent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white text-red-terra shadow-[0_6px_18px_rgba(126,30,2,0.32)] md:flex">
        <ArrowRight className="size-7" />
      </div>
    </div>
  );
}
