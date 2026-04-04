/**
 * gridIconRenderer — SVG React components for Sanity preview `media`.
 *
 * Three families:
 *   getGridIcon(rows)      — full 2-D layout preview for the top-level module card
 *   getRowIcon(colCount)   — shows N equal columns in a row
 *   getColumnIcon(width)   — shows THIS column's proportion within an implied row
 *
 * All icons are 16×16, computed from shared layout constants so gaps and
 * padding stay consistent across every variant.
 */
import React from "react";

// ─── Layout constants ────────────────────────────────────────────────────────
const W = 16;
const H = 16;
const PAD = 1; // outer horizontal padding
const TOP = 2; // top inset
const BOT = H - TOP; // 14 — bottom edge
const RH = BOT - TOP; // 12 — rect height
const INNER = W - PAD * 2; // 14 — usable width
const GAP = 2; // gap between columns
const DIM = 0.2; // opacity for "ghost" (sibling) columns

// ─── Shared SVG wrapper ───────────────────────────────────────────────────────
function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      fill="currentColor"
    >
      {children}
    </svg>
  );
}

// ─── Row icons ────────────────────────────────────────────────────────────────
// Show N equal-width columns across the full inner width.

function colWidth(n: number) {
  return (INNER - GAP * (n - 1)) / n;
}

function colX(n: number, i: number) {
  return PAD + i * (colWidth(n) + GAP);
}

function RowCols({ n, rx = 1.5 }: { n: number; rx?: number }) {
  const w = colWidth(n);
  return (
    <Svg>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={colX(n, i)} y={TOP} width={w} height={RH} rx={rx} />
      ))}
    </Svg>
  );
}

export const RowIcon1Col = () => <RowCols n={1} />;
export const RowIcon2Col = () => <RowCols n={2} />;
export const RowIcon3Col = () => <RowCols n={3} rx={1} />;
export const RowIcon4Col = () => <RowCols n={4} rx={0.75} />;

const ROW_ICONS: Record<number, React.ComponentType> = {
  1: RowIcon1Col,
  2: RowIcon2Col,
  3: RowIcon3Col,
  4: RowIcon4Col,
};

/**
 * Returns a React icon component for a row with `colCount` equal columns.
 * Falls back to 2-col if colCount is out of range.
 */
export function getRowIcon(colCount: number): React.ComponentType {
  return ROW_ICONS[colCount] ?? RowIcon2Col;
}

// ─── Column width icons ───────────────────────────────────────────────────────
// Show THIS column highlighted; ghost rects fill out the implied row so the
// proportion is immediately readable.

/** Full width — one solid block spanning everything */
export const ColIconFull = () => (
  <Svg>
    <rect x={PAD} y={TOP} width={INNER} height={RH} rx={1.5} />
  </Svg>
);

/** Half (1/2) — left block solid, right block dimmed */
export const ColIconHalf = () => {
  const w = colWidth(2);
  return (
    <Svg>
      <rect x={colX(2, 0)} y={TOP} width={w} height={RH} rx={1.5} />
      <rect x={colX(2, 1)} y={TOP} width={w} height={RH} rx={1.5} opacity={DIM} />
    </Svg>
  );
};

/** One-third (1/3) — first block solid, other two dimmed */
export const ColIconOneThird = () => {
  const w = colWidth(3);
  return (
    <Svg>
      <rect x={colX(3, 0)} y={TOP} width={w} height={RH} rx={1} />
      <rect x={colX(3, 1)} y={TOP} width={w} height={RH} rx={1} opacity={DIM} />
      <rect x={colX(3, 2)} y={TOP} width={w} height={RH} rx={1} opacity={DIM} />
    </Svg>
  );
};

/** Two-thirds (2/3) — merged first-two-thirds solid, last third dimmed */
export const ColIconTwoThirds = () => {
  const w1 = colWidth(3);
  const w23 = w1 * 2 + GAP;
  return (
    <Svg>
      <rect x={PAD} y={TOP} width={w23} height={RH} rx={1.5} />
      <rect x={PAD + w23 + GAP} y={TOP} width={w1} height={RH} rx={1} opacity={DIM} />
    </Svg>
  );
};

/**
 * Auto — equal-width with siblings; we show two equal blocks (most common
 * default) with no ghost to signal "size decided at runtime."
 */
export const ColIconAuto = () => {
  const w = colWidth(2);
  return (
    <Svg>
      <rect x={colX(2, 0)} y={TOP} width={w} height={RH} rx={1.5} />
      <rect x={colX(2, 1)} y={TOP} width={w} height={RH} rx={1.5} />
    </Svg>
  );
};

const COL_ICONS: Record<string, React.ComponentType> = {
  full: ColIconFull,
  half: ColIconHalf,
  oneThird: ColIconOneThird,
  twoThirds: ColIconTwoThirds,
  auto: ColIconAuto,
};

// ─── Content-type icons ───────────────────────────────────────────────────────
// Each icon is 16×16 and represents what lives inside the column, not its width.

/** block — four horizontal text lines */
const ColContentText = () => (
  <Svg>
    <rect x={2} y={2.5} width={12} height={1.5} rx={0.75} />
    <rect x={2} y={6} width={9} height={1.5} rx={0.75} />
    <rect x={2} y={9.5} width={12} height={1.5} rx={0.75} />
    <rect x={2} y={13} width={6} height={1.5} rx={0.75} />
  </Svg>
);

/** image — frame outline + mountain + sun */
const ColContentImage = () => (
  <Svg>
    {/* frame */}
    <rect x={1} y={2} width={14} height={12} rx={1.5} opacity={0.15} />
    {/* sun */}
    <circle cx={12.5} cy={5} r={1.5} />
    {/* mountain */}
    <path d="M1.5 13.5 L6 7.5 L9.5 11 L12 8.5 L14.5 13.5 Z" />
  </Svg>
);

/** statCardsBlock — 2×2 card grid */
const ColContentStatCards = () => (
  <Svg>
    <rect x={1} y={1} width={6} height={6} rx={1} />
    <rect x={9} y={1} width={6} height={6} rx={1} />
    <rect x={1} y={9} width={6} height={6} rx={1} />
    <rect x={9} y={9} width={6} height={6} rx={1} />
  </Svg>
);

/** ctaBlock — centered pill/button */
const ColContentCta = () => (
  <Svg>
    <rect x={2} y={5.5} width={12} height={5} rx={2.5} />
  </Svg>
);

/** testimonialBlock — speech bubble */
const ColContentTestimonial = () => (
  <Svg>
    <rect x={1} y={1.5} width={12} height={9} rx={2} />
    {/* tail */}
    <path d="M3 10.5 L2 14.5 L7 10.5 Z" />
  </Svg>
);

/** numberedStepBlock — three rows with a numbered square on the left */
const ColContentNumberedStep = () => (
  <Svg>
    <rect x={1} y={1.5} width={3.5} height={3.5} rx={0.75} />
    <rect x={6} y={2.5} width={9} height={1.5} rx={0.75} />
    <rect x={1} y={6.5} width={3.5} height={3.5} rx={0.75} />
    <rect x={6} y={7.5} width={9} height={1.5} rx={0.75} />
    <rect x={1} y={11.5} width={3.5} height={3.5} rx={0.75} />
    <rect x={6} y={12.5} width={6} height={1.5} rx={0.75} />
  </Svg>
);

/** iconFeatureBlock — three rows with a circle icon on the left */
const ColContentIconFeature = () => (
  <Svg>
    <circle cx={3} cy={3.5} r={2} />
    <rect x={7} y={2.5} width={8} height={1.5} rx={0.75} />
    <circle cx={3} cy={8.5} r={2} />
    <rect x={7} y={7.5} width={8} height={1.5} rx={0.75} />
    <circle cx={3} cy={13.5} r={2} />
    <rect x={7} y={12.5} width={5} height={1.5} rx={0.75} />
  </Svg>
);

/** checkListBlock — three rows with a checkbox on the left */
const ColContentCheckList = () => (
  <Svg>
    {/* checked boxes (filled inner square) */}
    <rect x={1} y={1.5} width={3.5} height={3.5} rx={0.5} opacity={0.25} />
    <rect x={1.75} y={2.25} width={2} height={2} rx={0.25} />
    <rect x={6} y={2.5} width={9} height={1.5} rx={0.75} />
    <rect x={1} y={6.5} width={3.5} height={3.5} rx={0.5} opacity={0.25} />
    <rect x={1.75} y={7.25} width={2} height={2} rx={0.25} />
    <rect x={6} y={7.5} width={9} height={1.5} rx={0.75} />
    {/* unchecked box */}
    <rect x={1} y={11.5} width={3.5} height={3.5} rx={0.5} opacity={0.25} />
    <rect x={6} y={12.5} width={6} height={1.5} rx={0.75} />
  </Svg>
);

const CONTENT_TYPE_ICONS: Record<string, React.ComponentType> = {
  block: ColContentText,
  image: ColContentImage,
  statCardsBlock: ColContentStatCards,
  ctaBlock: ColContentCta,
  testimonialBlock: ColContentTestimonial,
  numberedStepBlock: ColContentNumberedStep,
  iconFeatureBlock: ColContentIconFeature,
  checkListBlock: ColContentCheckList,
};

/** Priority order when a column has mixed content. */
const CONTENT_PRIORITY = [
  "image",
  "statCardsBlock",
  "ctaBlock",
  "testimonialBlock",
  "numberedStepBlock",
  "iconFeatureBlock",
  "checkListBlock",
  "block",
];

type ContentItem = { _type: string };

function detectContentType(content: ContentItem[] | undefined): string | null {
  if (!content?.length) return null;
  const types = new Set(content.map((b) => b._type));
  return CONTENT_PRIORITY.find((t) => types.has(t)) ?? null;
}

/**
 * Returns a React icon component for a column.
 *
 * If `content` is provided and non-empty, the icon reflects what's inside
 * (text, image, CTA, etc.). Falls back to a proportional width icon when
 * the column is empty or `content` is omitted.
 */
export function getColumnIcon(
  width: string,
  content?: ContentItem[]
): React.ComponentType {
  const contentType = detectContentType(content);
  if (contentType) return CONTENT_TYPE_ICONS[contentType] ?? ColIconAuto;
  return COL_ICONS[width] ?? ColIconAuto;
}

// ─── Full grid layout icon ────────────────────────────────────────────────────
// Reads the actual rows[].columns.length from the parent gridSection's
// prepare() data and renders a true 2-D mini-map of the layout.

type RowLike = { columns?: unknown[] };

/**
 * Returns a React icon component showing the full grid layout as a 2-D
 * mini-map — one row of blocks per gridRow, N blocks per row for N columns.
 *
 * Pass the raw `rows` array directly from `prepare({ rows })`.
 */
export function getGridIcon(rows: RowLike[]): React.ComponentType {
  const rowCols = (rows ?? []).map((r) => Math.max(1, r.columns?.length ?? 1));
  const numRows = Math.max(1, rowCols.length);

  return function GridLayoutIcon() {
    const ROW_GAP = 2;
    const totalGap = ROW_GAP * (numRows - 1);
    const rowH = Math.max(2, (RH - totalGap) / numRows);
    const rx = Math.min(1.5, rowH / 3);

    return (
      <Svg>
        {rowCols.map((cols, ri) => {
          const y = TOP + ri * (rowH + ROW_GAP);
          const w = colWidth(cols);
          return Array.from({ length: cols }, (_, ci) => (
            <rect
              key={`${ri}-${ci}`}
              x={colX(cols, ci)}
              y={y}
              width={w}
              height={rowH}
              rx={rx}
            />
          ));
        })}
      </Svg>
    );
  };
}
