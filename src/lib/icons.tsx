import * as LucideIcons from "lucide-react";

const iconNames = [
  "Shield",
  "Globe",
  "CheckCircle",
  "Star",
  "Phone",
  "Calendar",
  "MessageCircle",
  "PieChart",
  "Users",
  "Clock",
  "PhoneOff",
  "DollarSign",
  "AlertCircle",
  "TrendingDown",
  "Activity",
  "Monitor",
  "BarChart3",
  "ChevronRight",
  "ArrowRight",
  "Mail",
] as const;

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

export function getIcon(name: string): React.ComponentType<{ className?: string; size?: number }> {
  const pascal = toPascalCase(name);
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[pascal];
  return Icon || LucideIcons.Shield;
}
