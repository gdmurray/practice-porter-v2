import React from "react";
import { set } from "sanity";
import type { StringInputProps } from "sanity";
import { useFormValue } from "sanity";
import { getIcon } from "@/lib/icons";

const COLOR_OPTIONS = [
  {
    value: "ink",
    label: "Ink",
    bg: "rgba(43,26,20,0.08)",
    fg: "#2B1A14",
  },
  {
    value: "terra",
    label: "Terracotta",
    bg: "#FFEEE4",
    fg: "#C0532C",
  },
  {
    value: "red",
    label: "Burnt Red",
    bg: "rgba(163,39,5,0.10)",
    fg: "#A32705",
  },
] as const;

export function IconColorInput(props: StringInputProps) {
  const { value, onChange, path } = props;

  // Read the sibling `icon` field from the same parent object
  const iconName = useFormValue([
    ...path.slice(0, -1),
    "icon",
  ]) as string | undefined;

  const Icon = iconName ? getIcon(iconName) : null;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
      {COLOR_OPTIONS.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(set(opt.value))}
            title={opt.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {/* Icon swatch */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                background: opt.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: isSelected
                  ? `2px solid ${opt.fg}`
                  : "2px solid transparent",
                outlineOffset: 2,
                transition: "outline 0.15s ease",
              }}
            >
              {Icon ? (
                <Icon size={22} style={{ color: opt.fg }} />
              ) : (
                /* Placeholder circle when no icon selected */
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: opt.fg,
                    opacity: 0.5,
                  }}
                />
              )}
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: 11,
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? opt.fg : "#888",
              }}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
