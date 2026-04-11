import * as LucideIcons from "lucide-react";
// iconNames kept for reference; getIcon resolves dynamically so any name in ICON_NAMES works
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export { ICON_NAMES, ICON_LIST } from "./iconNames";

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

export function getIcon(
  name: string
): React.ComponentType<{
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> {
  const pascal = toPascalCase(name);
  const Icon = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{
        className?: string;
        size?: number;
        color?: string;
        style?: React.CSSProperties;
      }>
    >
  )[pascal];
  return Icon || LucideIcons.Shield;
}
