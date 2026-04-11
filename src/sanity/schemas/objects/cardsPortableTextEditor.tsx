import React from "react";
import { defineArrayMember } from "sanity";
import {
  DropIcon,
  HighlightIcon,
  StarFilledIcon,
} from "@sanity/icons";

// ─── Studio preview components ──────────────────────────────────────────────

const CardTitleStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "20px",
      fontWeight: 700,
      color: "#0B1D3A",
    }}
  >
    {children}
  </span>
);

const CardNumberStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "56px",
      fontWeight: 800,
      lineHeight: 1,
      color: "#E8DBC4",
    }}
  >
    {children}
  </span>
);

const MetricValueStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "22px",
      fontWeight: 700,
      color: "#0B1D3A",
    }}
  >
    {children}
  </span>
);

const MetricLabelStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "#C4C4C4",
    }}
  >
    {children}
  </span>
);

const StepNumberStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    }}
  >
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "2px solid #c9a96e",
        background: "#ffffff",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 18,
        fontWeight: 700,
        color: "#c9a96e",
      }}
    >
      {children}
    </span>
  </span>
);

const StepTagStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#1a5c5e",
    }}
  >
    {children}
  </span>
);

const CardLeadStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "15px",
      lineHeight: 1.7,
      color: "#9b9b9b",
    }}
  >
    {children}
  </p>
);

const CardCaptionStyle = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "block",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#C4C4C4",
    }}
  >
    {children}
  </span>
);

// ─── Sup / Sub toolbar icons ─────────────────────────────────────────────────

const SupIcon = () => (
  <span style={{ fontFamily: "serif", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>
    x<sup style={{ fontSize: "0.65em" }}>2</sup>
  </span>
);

const SubIcon = () => (
  <span style={{ fontFamily: "serif", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>
    x<sub style={{ fontSize: "0.65em" }}>2</sub>
  </span>
);

const SupMark = ({ children }: { children: React.ReactNode }) => (
  <sup style={{ fontSize: "0.65em", lineHeight: 0 }}>{children}</sup>
);

const SubMark = ({ children }: { children: React.ReactNode }) => (
  <sub style={{ fontSize: "0.65em", lineHeight: 0 }}>{children}</sub>
);

// ─── Mark preview components ─────────────────────────────────────────────────

const HighlightMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e" }}>{children}</span>
);

const GoldMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#c9a96e" }}>{children}</span>
);

const TealMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e" }}>{children}</span>
);

// ─── Exported portable text block definition ──────────────────────────────────

export const cardsPortableTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Card Lead (15px)", value: "cardLead", component: CardLeadStyle },
    { title: "Card Title", value: "cardTitle", component: CardTitleStyle },
    { title: "Card Number (decorative)", value: "cardNumber", component: CardNumberStyle },
    { title: "Step Number (circled)", value: "stepNumber", component: StepNumberStyle },
    { title: "Step Tag", value: "stepTag", component: StepTagStyle },
    { title: "Metric Value", value: "metricValue", component: MetricValueStyle },
    { title: "Metric Label", value: "metricLabel", component: MetricLabelStyle },
    { title: "Caption (12px)", value: "cardCaption", component: CardCaptionStyle },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Superscript", value: "sup", icon: SupIcon, component: SupMark },
      { title: "Subscript",  value: "sub", icon: SubIcon, component: SubMark },
      {
        title: "Highlight",
        value: "highlight",
        icon: HighlightIcon,
        component: HighlightMark,
      },
      {
        title: "Gold",
        value: "highlightGold",
        icon: StarFilledIcon,
        component: GoldMark,
      },
      {
        title: "Teal",
        value: "highlightTeal",
        icon: DropIcon,
        component: TealMark,
      },
    ],
  },
});
