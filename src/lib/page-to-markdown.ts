import type { PAGE_QUERY_RESULT } from "../../sanity.types";

type Page = NonNullable<PAGE_QUERY_RESULT>;
type PageModule = NonNullable<Page["modules"]>[number];
type GridColumnContent = NonNullable<
  NonNullable<
    Extract<PageModule, { _type: "gridSection" }>["rows"]
  >[number]["columns"]
>[number]["content"] extends (infer T)[] | null
  ? T
  : never;

type PortableBlock = {
  _type: "block";
  style?: string | null;
  listItem?: "bullet" | "number" | null;
  children?: Array<{
    _type: "span";
    text?: string | null;
    marks?: Array<string> | null;
  }> | null;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string | null;
  }> | null;
};

function ctaLine(cta: { label?: string | null; href?: string | null } | null | undefined) {
  if (!cta?.label) return null;
  return cta.href ? `[${cta.label}](${cta.href})` : cta.label;
}

function spanText(block: PortableBlock): string {
  const defs = new Map(
    (block.markDefs ?? [])
      .filter((d) => d._type === "link" && d.href)
      .map((d) => [d._key, d.href!]),
  );

  return (block.children ?? [])
    .map((child) => {
      let text = child.text ?? "";
      const marks = child.marks ?? [];
      for (const mark of marks) {
        if (mark === "strong") text = `**${text}**`;
        else if (mark === "em") text = `*${text}*`;
        else if (defs.has(mark)) text = `[${text}](${defs.get(mark)})`;
      }
      return text;
    })
    .join("");
}

function portableTextToMarkdown(blocks: PortableBlock[] | null | undefined): string[] {
  if (!blocks?.length) return [];

  const lines: string[] = [];
  let listBuffer: string[] = [];
  let listKind: "bullet" | "number" | null = null;

  const flushList = () => {
    if (!listBuffer.length || !listKind) return;
    lines.push(...listBuffer);
    lines.push("");
    listBuffer = [];
    listKind = null;
  };

  for (const block of blocks) {
    if (block._type !== "block") continue;
    const text = spanText(block).trim();
    if (!text) continue;

    if (block.listItem === "bullet" || block.listItem === "number") {
      if (listKind && listKind !== block.listItem) flushList();
      listKind = block.listItem;
      const prefix = block.listItem === "bullet" ? "-" : "1.";
      listBuffer.push(`${prefix} ${text}`);
      continue;
    }

    flushList();

    switch (block.style) {
      case "h1":
        lines.push(`# ${text}`, "");
        break;
      case "h2":
      case "stepTitle":
      case "cardTitle":
        lines.push(`## ${text}`, "");
        break;
      case "h3":
      case "h4":
        lines.push(`### ${text}`, "");
        break;
      case "eyebrow":
      case "stat-eyebrow":
      case "stepTag":
        lines.push(`*${text}*`, "");
        break;
      case "blockquote":
        lines.push(`> ${text}`, "");
        break;
      default:
        lines.push(text, "");
        break;
    }
  }

  flushList();
  return lines;
}

function columnContentToMarkdown(content: GridColumnContent): string[] {
  const lines: string[] = [];

  switch (content._type) {
    case "block":
      lines.push(...portableTextToMarkdown([content as PortableBlock]));
      break;
    case "ctaBlock":
      for (const item of content.items ?? []) {
        const line = ctaLine(item);
        if (line) lines.push(`- ${line}`);
      }
      if (content.items?.length) lines.push("");
      break;
    case "checkListBlock":
      for (const item of content.items ?? []) {
        if (item.label) lines.push(`- ${item.label}`);
      }
      if (content.items?.length) lines.push("");
      break;
    case "cardsBlock":
      for (const card of content.items ?? []) {
        lines.push(...portableTextToMarkdown((card.content ?? []) as PortableBlock[]));
      }
      break;
    case "featureCardsBlock":
      for (const item of content.items ?? []) {
        if (item.title) lines.push(`### ${item.title}`);
        if (item.description) lines.push(item.description, "");
        const line = ctaLine(item.cta);
        if (line) lines.push(line, "");
      }
      break;
    case "iconFeatureBlock":
      for (const item of content.items ?? []) {
        if (item.title) lines.push(`### ${item.title}`);
        if (item.description) lines.push(item.description, "");
      }
      break;
    case "numberedStepBlock":
      (content.items ?? []).forEach((item, index) => {
        if (item.title) lines.push(`### ${index + 1}. ${item.title}`);
        if (item.description) lines.push(item.description, "");
      });
      break;
    case "pricingCardsBlock":
      for (const card of content.items ?? []) {
        const heading = [card.tag, card.amount, card.period].filter(Boolean).join(" — ");
        if (heading) lines.push(`### ${heading}`);
        if (card.desc) lines.push(card.desc);
        for (const feature of card.features ?? []) lines.push(`- ${feature}`);
        if (card.ctaLabel) {
          lines.push(card.ctaHref ? `[${card.ctaLabel}](${card.ctaHref})` : card.ctaLabel);
        }
        lines.push("");
      }
      break;
    case "statBandBlock":
      for (const stat of content.stats ?? []) {
        const value = [stat.value, stat.suffix].filter(Boolean).join("");
        if (value || stat.label) {
          lines.push(`- **${value}**${stat.label ? ` — ${stat.label}` : ""}`);
        }
      }
      if (content.stats?.length) lines.push("");
      break;
    case "statCardsBlock":
      for (const stat of content.items ?? []) {
        if (stat.value || stat.label) {
          lines.push(
            `- **${stat.value ?? ""}**${stat.label ? ` — ${stat.label}` : ""}`,
          );
        }
      }
      if (content.items?.length) lines.push("");
      break;
    case "testimonialBlock":
      for (const item of content.items ?? []) {
        if (item.quote) lines.push(`> ${item.quote}`);
        const by = [item.author, item.role].filter(Boolean).join(", ");
        if (by) lines.push(`> — ${by}`);
        lines.push("");
      }
      break;
    case "comparisonBlock": {
      for (const card of [content.leftCard, content.rightCard]) {
        if (!card) continue;
        const heading = [card.label, card.overLabel].filter(Boolean).join(" ");
        if (heading) lines.push(`### ${heading}`);
        if (card.value) lines.push(`**${card.value}**`);
        if (card.caption) lines.push(card.caption, "");
      }
      if (content.banner?.headline) {
        const headline = [
          content.banner.headline,
          content.banner.headlineEmphasis,
        ]
          .filter(Boolean)
          .join(" ");
        lines.push(`### ${headline}`);
        if (content.banner.subtext) lines.push(content.banner.subtext);
        const line = ctaLine(content.banner.cta);
        if (line) lines.push(line);
        lines.push("");
      }
      break;
    }
    case "solutionCard":
      if (content.title) lines.push(`### ${content.title}`);
      for (const detail of content.details ?? []) lines.push(`- ${detail}`);
      if (content.expandableTitle) lines.push(`#### ${content.expandableTitle}`);
      for (const check of content.checks ?? []) lines.push(`- ${check}`);
      lines.push("");
      break;
    case "tabsBlock":
      for (const tab of content.items ?? []) {
        if (tab.title) lines.push(`### ${tab.title}`);
        if (tab.content?.title) lines.push(`#### ${tab.content.title}`);
        for (const detail of tab.content?.details ?? []) lines.push(`- ${detail}`);
        for (const check of tab.content?.checks ?? []) lines.push(`- ${check}`);
        lines.push("");
      }
      break;
    case "approachTabsBlock":
      for (const tab of content.items ?? []) {
        if (tab.label) lines.push(`### ${tab.label}`);
        if (tab.kicker) lines.push(`*${tab.kicker}*`);
        if (tab.panelTitle) lines.push(`#### ${tab.panelTitle}`);
        if (tab.body) lines.push(tab.body, "");
        const link = ctaLine(tab.link ?? tab.cta);
        if (link) lines.push(link, "");
      }
      break;
    case "stickyScrollBlock":
      for (const item of content.items ?? []) {
        lines.push(...portableTextToMarkdown((item.content ?? []) as PortableBlock[]));
      }
      break;
    case "tailoredStepsBlock":
      for (const step of [content.stepOne, content.stepTwo]) {
        if (!step) continue;
        if (step.badge) lines.push(`*${step.badge}*`);
        if (step.eyebrow) lines.push(`*${step.eyebrow}*`);
        if (step.title) lines.push(`### ${step.title}`);
        if (step.body) lines.push(step.body, "");
        const line = ctaLine(step.cta);
        if (line) lines.push(line, "");
      }
      break;
    case "contactFormBlock":
      if (content.formTitle) lines.push(`### ${content.formTitle}`);
      if (content.formSubtitle) lines.push(content.formSubtitle, "");
      break;
    case "image":
      if (content.asset?.url) {
        const alt = content.alt?.trim() || "Image";
        lines.push(`![${alt}](${content.asset.url})`, "");
      }
      break;
    case "columnDivider":
      break;
    default: {
      const _exhaustive: never = content;
      void _exhaustive;
      break;
    }
  }

  return lines;
}

function moduleToMarkdown(module: PageModule): string[] {
  const lines: string[] = [];

  switch (module._type) {
    case "gridSection":
      for (const row of module.rows ?? []) {
        for (const column of row.columns ?? []) {
          for (const block of column.content ?? []) {
            lines.push(...columnContentToMarkdown(block));
          }
        }
      }
      break;
    case "faq":
      if (module.eyebrow) lines.push(`*${module.eyebrow}*`, "");
      if (module.title) lines.push(`## ${module.title}`, "");
      if (module.subtitle) lines.push(module.subtitle, "");
      for (const item of module.items ?? []) {
        if (item.question) lines.push(`### ${item.question}`);
        lines.push(...portableTextToMarkdown((item.answer ?? []) as PortableBlock[]));
      }
      break;
    case "legal":
      if (module.title) lines.push(`## ${module.title}`, "");
      if (module.effectiveDate) {
        const label =
          module.dateSource === "updated" ? "Last updated" : "Effective";
        lines.push(`*${label}: ${module.effectiveDate}*`, "");
      }
      lines.push(...portableTextToMarkdown((module.content ?? []) as PortableBlock[]));
      break;
    case "logoCarousel":
      if (module.label) lines.push(`*${module.label}*`, "");
      {
        const names = (module.logos ?? [])
          .map((logo) => logo.name)
          .filter((name): name is string => Boolean(name));
        if (names.length) lines.push(names.join(", "), "");
      }
      break;
    case "splitBooking":
      if (module.eyebrow) lines.push(`*${module.eyebrow}*`, "");
      if (module.title) lines.push(`## ${module.title}`, "");
      if (module.subtitle) lines.push(module.subtitle, "");
      for (const block of module.content ?? []) {
        if (block._type === "block") {
          lines.push(...portableTextToMarkdown([block as PortableBlock]));
        } else if (block._type === "checkListBlock") {
          for (const item of block.items ?? []) {
            if (item.label) lines.push(`- ${item.label}`);
          }
          lines.push("");
        } else if (block._type === "avatarBlock") {
          const who = [block.name, block.role].filter(Boolean).join(" — ");
          if (who) lines.push(`*${who}*`, "");
        } else {
          const _exhaustive: never = block;
          void _exhaustive;
        }
      }
      break;
    case "stepBand":
      for (const step of [module.stepOne, module.stepTwo]) {
        if (!step) continue;
        if (step.label) lines.push(`### ${step.label}`);
        if (step.description) lines.push(step.description, "");
      }
      break;
    default: {
      const _exhaustive: never = module;
      void _exhaustive;
      break;
    }
  }

  return lines;
}

/** Serialize a Sanity page document into agent-friendly Markdown. */
export function pageToMarkdown(page: Page): string {
  const title = page.seo?.metaTitle?.trim() || page.title?.trim() || "Untitled";
  const description = page.seo?.metaDescription?.trim();
  const lines: string[] = [`# ${title}`, ""];

  if (description) {
    lines.push(`> ${description}`, "");
  }

  for (const module of page.modules ?? []) {
    lines.push(...moduleToMarkdown(module));
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

export function markdownResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
