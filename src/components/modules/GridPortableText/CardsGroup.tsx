"use client";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

interface CardIconValue {
  _key?: string;
  icon?: string;
  iconColor?: "ink" | "terra" | "red";
  iconShape?: "square" | "circle";
}

interface ColumnDividerValue {
  _key?: string;
  style?: "line" | "spacer";
}

interface InlineStatItem {
  _key?: string;
  value?: string;
  suffix?: string;
  suffixColor?: "red" | "terra" | "ink";
  label?: string;
}

interface StatRowValue {
  _key?: string;
  stats?: InlineStatItem[];
}

interface CardItem {
  _key?: string;
  content?: PortableTextBlock[];
}

interface CardTheme {
  cardBg?: "lotion" | "vanilla" | "white" | "transparent";
  bordered?: boolean;
  layout?: "left" | "center";
  padding?: "compact" | "default" | "spacious";
  hoverEffect?: boolean;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

const suffixColorMap: Record<string, string> = {
  red: "text-red",
  terra: "text-red-terra",
  ink: "text-ink",
};

const iconBgMap: Record<string, string> = {
  ink: "bg-[rgba(43,26,20,0.08)] text-ink",
  terra: "bg-vanilla text-red-terra",
  red: "bg-[rgba(163,39,5,0.10)] text-red",
};

const cardBgMap: Record<string, string> = {
  lotion: "bg-lotion",
  vanilla: "bg-vanilla",
  white: "bg-white",
  transparent: "bg-transparent",
};

const paddingMap: Record<string, string> = {
  compact: "p-4",
  default: "p-8",
  spacious: "p-12",
};

// ─── Portable text component factory ─────────────────────────────────────────

function makeCardComponents(centered: boolean): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="text-sm leading-relaxed text-muted-text">{children}</p>
      ),
      cardLead: ({ children }) => (
        <p className="text-[15px] leading-[1.7] text-muted-text">{children}</p>
      ),
      cardTitle: ({ children }) => (
        <h3 className="font-serif text-[20px] font-medium text-ink">
          {children}
        </h3>
      ),
      cardNumber: ({ children }) => (
        <div className="font-serif text-[56px] font-medium leading-none text-vanilla">
          {children}
        </div>
      ),
      stepNumber: ({ children }) => (
        <div className={cn("mb-5 flex", centered ? "justify-center" : "justify-start")}>
          <div className="flex size-[52px] items-center justify-center rounded-full border-2 border-red bg-white font-serif text-[18px] font-semibold text-red">
            {children}
          </div>
        </div>
      ),
      stepTag: ({ children }) => (
        <div className="text-[10px] font-bold uppercase tracking-[2px] text-red-terra">
          {children}
        </div>
      ),
      metricValue: ({ children }) => (
        <div className="font-serif text-[22px] font-medium text-ink">
          {children}
        </div>
      ),
      metricLabel: ({ children }) => (
        <div className="text-[11px] font-semibold uppercase tracking-wider text-light-gray">
          {children}
        </div>
      ),
      cardCaption: ({ children }) => (
        <p className="text-xs leading-snug text-light-gray">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      sup: ({ children }) => (
        <sup className="text-[0.65em] leading-none">{children}</sup>
      ),
      sub: ({ children }) => (
        <sub className="text-[0.65em] leading-none">{children}</sub>
      ),
      highlight: ({ children }) => (
        <span className="text-red">{children}</span>
      ),
      highlightRed: ({ children }) => (
        <span className="font-medium text-red">{children}</span>
      ),
      highlightTerra: ({ children }) => (
        <span className="text-red-terra">{children}</span>
      ),
    },
    types: {
      cardIcon: ({ value }: { value: CardIconValue }) => {
        const Icon = value.icon ? getIcon(value.icon) : null;
        const color = value.iconColor ?? "terra";
        const isCircle = value.iconShape === "circle";
        return (
          <div className={cn("mb-5 flex items-start", centered && "justify-center")}>
            <div
              className={cn(
                "flex shrink-0 items-center justify-center",
                isCircle ? "size-14 rounded-full" : "size-12 rounded-xl",
                iconBgMap[color] ?? iconBgMap.terra
              )}
            >
              {Icon && <Icon className="size-6" />}
            </div>
          </div>
        );
      },
      columnDivider: ({ value }: { value: ColumnDividerValue }) => {
        if (value.style === "spacer") return <div className="my-4" />;
        return <hr className="my-4 border-border-color" />;
      },
      statRow: ({ value }: { value: StatRowValue }) => (
        <div className={cn("flex flex-wrap gap-x-6 gap-y-3", centered && "justify-center")}>
          {value.stats?.map((stat, i) => (
            <div key={stat._key ?? i} className="flex flex-col">
              <div className="font-serif text-[22px] font-medium leading-none text-ink">
                {stat.value}
                {stat.suffix && (
                  <span
                    className={cn(
                      "ml-0.5 text-[0.7em]",
                      stat.suffixColor
                        ? suffixColorMap[stat.suffixColor]
                        : "text-red"
                    )}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              {stat.label && (
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-light-gray">
                  {stat.label}
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    },
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CardsGroup({
  value,
  animated = false,
}: {
  value: { columns?: number; cardTheme?: CardTheme; items?: CardItem[] };
  animated?: boolean;
}) {
  const cols = value.columns ?? 3;
  const theme = value.cardTheme ?? {};
  const layout = theme.layout ?? "left";
  const centered = layout === "center";
  const cardBg = theme.cardBg ?? "lotion";
  const bordered = theme.bordered ?? false;
  const padding = theme.padding ?? "default";
  const hoverEffect = theme.hoverEffect ?? false;

  const gridCols =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cols === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

  const components = makeCardComponents(centered);

  return (
    <div
      className={cn("grid gap-6", gridCols)}
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {value.items?.map((card, i) => (
        <div
          key={card._key ?? i}
          className={cn(
            "rounded-xl",
            paddingMap[padding] ?? paddingMap.default,
            cardBgMap[cardBg] ?? cardBgMap.lotion,
            bordered && "border border-border-color",
            centered && "text-center",
            hoverEffect &&
              "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
          )}
        >
          {card.content && (
            <div className="space-y-2">
              <PortableText value={card.content} components={components} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
