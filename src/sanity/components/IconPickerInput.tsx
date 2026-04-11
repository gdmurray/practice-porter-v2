import React, { useState } from "react";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import { getIcon } from "@/lib/icons";
import { ICON_NAMES } from "@/lib/iconNames";

export function IconPickerInput(props: StringInputProps) {
  const { value, onChange } = props;
  const [search, setSearch] = useState("");

  const filtered = ICON_NAMES.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(name: string) {
    if (name === value) {
      onChange(unset());
    } else {
      onChange(set(name));
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        placeholder="Search icons…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px 12px",
          border: "1px solid #e2e2e2",
          borderRadius: 6,
          fontSize: 13,
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
          gap: 8,
        }}
      >
        {filtered.map((name) => {
          const Icon = getIcon(name);
          const isSelected = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(name)}
              title={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "10px 4px 8px",
                borderRadius: 8,
                border: isSelected
                  ? "2px solid #1a5c5e"
                  : "1px solid #e2e2e2",
                background: isSelected ? "#e4f0f0" : "#fff",
                cursor: "pointer",
                transition: "all 0.12s ease",
              }}
            >
              <Icon
                size={20}
                style={{ color: isSelected ? "#1a5c5e" : "#555" }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: isSelected ? "#1a5c5e" : "#888",
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: "center",
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 13, color: "#888", textAlign: "center" }}>
          No icons match &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}
