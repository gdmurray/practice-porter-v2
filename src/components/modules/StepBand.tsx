"use client";

import { useEffect, useRef } from "react";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";

export interface StepBandItemData {
  label?: string | null;
  description?: string | null;
}

export interface StepBandProps {
  stepOne?: StepBandItemData | null;
  stepTwo?: StepBandItemData | null;
  moduleLayout?: ModuleLayoutValue | null;
}

function MarkFlip() {
  const flipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flip = flipRef.current;
    if (!flip) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      flip.classList.add("flipped");
      return;
    }

    const timer = setTimeout(() => {
      flip.classList.add("flipped");
    }, 2600);

    const mark = flip.parentElement;
    if (!mark) return () => clearTimeout(timer);

    const handleEnter = () => flip.classList.remove("flipped");
    const handleLeave = () => flip.classList.add("flipped");

    mark.addEventListener("mouseenter", handleEnter);
    mark.addEventListener("mouseleave", handleLeave);

    return () => {
      clearTimeout(timer);
      mark.removeEventListener("mouseenter", handleEnter);
      mark.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="step-band__mark-flip" ref={flipRef}>
      <div className="step-band__mark-face step-band__mark-face--front">
        <img
          src="/pp-logo-red-stacked.png"
          alt="Practice Porter"
          style={{ width: 78, height: "auto", display: "block" }}
        />
      </div>
      <div className="step-band__mark-face step-band__mark-face--back">
        <img
          src="/pp-logomark-large.png"
          alt="Practice Porter"
          style={{ width: 66, height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

export function StepBand({ stepOne, stepTwo, moduleLayout }: StepBandProps) {
  if (!stepOne && !stepTwo) return null;

  return (
    <section className="step-band" {...getModuleLayoutAttrs(moduleLayout)}>
      <div className="step-band__item step-band__item--one">
        <div className="step-band__num">1</div>
        <div className="step-band__body">
          {stepOne?.label && (
            <div className="step-band__label">
              Step 1 &ndash; <strong>{stepOne.label}</strong>
            </div>
          )}
          {stepOne?.description && (
            <p className="step-band__desc">{stepOne.description}</p>
          )}
        </div>
      </div>

      <div className="step-band__item step-band__item--two">
        <div className="step-band__num">2</div>
        <div className="step-band__body">
          {stepTwo?.label && (
            <div className="step-band__label">
              Step 2 &ndash; <strong>{stepTwo.label}</strong>
            </div>
          )}
          {stepTwo?.description && (
            <p className="step-band__desc">{stepTwo.description}</p>
          )}
        </div>
      </div>

      <div className="step-band__mark" aria-hidden="true">
        <MarkFlip />
      </div>
    </section>
  );
}
