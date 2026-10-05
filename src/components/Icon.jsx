import {
  BookOpen,
  Glasses,
  ScanFace,
  MessagesSquare,
  Gauge,
  ChartNoAxesCombined,
  Brain,
  Drama,
  ChartSpline,
  Sparkles,
} from "lucide-react";

// Icons referenced by name from the constants files.
const ICONS = {
  BookOpen,
  Glasses,
  ScanFace,
  MessagesSquare,
  Gauge,
  ChartNoAxesCombined,
  Brain,
  Drama,
  ChartSpline,
};

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component {...props} />;
}
