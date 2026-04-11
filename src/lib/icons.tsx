import {
  Activity,
  AlertCircle,
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Phone,
  PhoneOff,
  PieChart,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  User,
  UserX,
  Users,
  Zap,
  type LucideProps,
} from "lucide-react";

export { ICON_NAMES, ICON_LIST } from "./iconNames";

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  "activity": Activity,
  "alert-circle": AlertCircle,
  "bar-chart": BarChart,
  "book-open": BookOpen,
  "calendar": Calendar,
  "check-circle": CheckCircle,
  "clock": Clock,
  "dollar-sign": DollarSign,
  "phone": Phone,
  "phone-off": PhoneOff,
  "pie-chart": PieChart,
  "star": Star,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  "user": User,
  "user-x": UserX,
  "users": Users,
  "zap": Zap,
};

export function getIcon(name: string): IconComponent {
  return ICON_MAP[name] ?? Shield;
}
