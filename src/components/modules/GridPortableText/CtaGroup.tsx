"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ctaProps, type CtaData } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function makeCtaGroup(centered: boolean) {
  return function CtaGroup({
    value,
  }: {
    value: { items?: CtaData[]; alignment?: string };
  }) {
    const isCentered =
      value.alignment === "center" || (value.alignment == null && centered);
    return (
      <div
        className={cn(
          "mt-8 flex flex-wrap items-center gap-5",
          isCentered && "justify-center"
        )}
      >
        {value.items?.map((cta, i) => (
          <Button
            key={i}
            variant={cta.variant === "secondary" ? "outline" : "brand"}
            size="cta"
            asChild
          >
            <a {...ctaProps(cta)}>
              {cta.label}
              <ChevronRight className="size-4" />
            </a>
          </Button>
        ))}
      </div>
    );
  };
}
