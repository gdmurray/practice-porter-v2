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
  iconColor?: "navy" | "teal" | "gold";
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
  suffixColor?: "navy" | "teal" | "gold";
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
  cardBg?: "cream" | "white" | "transparent";
  bordered?: boolean;
  layout?: "left" | "center";
  padding?: "compact" | "default" | "spacious";
  hoverEffect?: boolean;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

const suffixColorMap: Record<string, string> = {
  gold: "text-gold",
  teal: "text-teal",
  navy: "text-midnight",
};

// Matches the HTML: icon-navy, icon-teal, icon-gold classes
const iconBgMap: Record<string, string> = {
  navy: "bg-[rgba(11,29,58,0.08)] text-midnight",
  teal: "bg-teal-pale text-teal",
  gold: "bg-[rgba(201,169,110,0.12)] text-gold",
};

const cardBgMap: Record<string, string> = {
  cream: "bg-off-white",
  white: "bg-white",
  transparent: "bg-transparent",
};

// 32px default matches the "What's Inside" report-section-card padding in HTML design
const paddingMap: Record<string, string> = {
  compact: "p-4",    // 16px = --space-sm
  default: "p-8",   // 32px
  spacious: "p-12", // 48px = --space-lg
};

// ─── Portable text component factory ─────────────────────────────────────────

function makeCardComponents(centered: boolean): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="text-sm leading-relaxed text-mid-gray">{children}</p>
      ),
      cardLead: ({ children }) => (
        <p className="text-[15px] leading-[1.7] text-mid-gray">{children}</p>
      ),
      cardTitle: ({ children }) => (
        <h3 className="font-serif text-[20px] font-bold text-midnight">
          {children}
        </h3>
      ),
      cardNumber: ({ children }) => (
        <div className="font-serif text-[56px] font-extrabold leading-none text-gold-pale">
          {children}
        </div>
      ),
      stepNumber: ({ children }) => (
        <div className={cn("mb-5 flex", centered ? "justify-center" : "justify-start")}>
          <div className="flex size-[52px] items-center justify-center rounded-full border-2 border-gold bg-white font-serif text-[18px] font-bold text-gold">
            {children}
          </div>
        </div>
      ),
      stepTag: ({ children }) => (
        <div className="text-[10px] font-bold uppercase tracking-[2px] text-teal">
          {children}
        </div>
      ),
      metricValue: ({ children }) => (
        <div className="font-serif text-[22px] font-bold text-midnight">
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
        <span className="text-teal">{children}</span>
      ),
      highlightGold: ({ children }) => (
        <span className="font-medium text-gold">{children}</span>
      ),
      highlightTeal: ({ children }) => (
        <span className="text-teal">{children}</span>
      ),
    },
    types: {
      cardIcon: ({ value }: { value: CardIconValue }) => {
        const Icon = value.icon ? getIcon(value.icon) : null;
        const color = value.iconColor ?? "teal";
        const isCircle = value.iconShape === "circle";
        return (
          <div className={cn("mb-5 flex items-start", centered && "justify-center")}>
            <div
              className={cn(
                "flex shrink-0 items-center justify-center",
                isCircle ? "size-14 rounded-full" : "size-12 rounded-xl",
                iconBgMap[color] ?? iconBgMap.teal
              )}
            >
              {Icon && <Icon className="size-6" />}
            </div>
          </div>
        );
      },
      columnDivider: ({ value }: { value: ColumnDividerValue }) => {
        if (value.style === "spacer") return <div className="my-4" />;
        return <hr className="my-4 border-warm-gray" />;
      },
      statRow: ({ value }: { value: StatRowValue }) => (
        <div className={cn("flex flex-wrap gap-x-6 gap-y-3", centered && "justify-center")}>
          {value.stats?.map((stat, i) => (
            <div key={stat._key ?? i} className="flex flex-col">
              <div className="font-serif text-[22px] font-bold leading-none text-midnight">
                {stat.value}
                {stat.suffix && (
                  <span
                    className={cn(
                      "ml-0.5 text-[0.7em]",
                      stat.suffixColor
                        ? suffixColorMap[stat.suffixColor]
                        : "text-gold"
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
}: {
  value: { columns?: number; cardTheme?: CardTheme; items?: CardItem[] };
}) {
  const cols = value.columns ?? 3;
  const theme = value.cardTheme ?? {};
  const layout = theme.layout ?? "left";
  const centered = layout === "center";
  const cardBg = theme.cardBg ?? "cream";
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
    <div className={cn("grid gap-6", gridCols)}>
      {value.items?.map((card, i) => (
        <div
          key={card._key ?? i}
          className={cn(
            "rounded-xl",
            paddingMap[padding] ?? paddingMap.default,
            cardBgMap[cardBg] ?? cardBgMap.cream,
            bordered && "border border-warm-gray",
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
