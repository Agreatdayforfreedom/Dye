import { DomainLayout } from "./types";

export const tw_color_scale = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

export const default_tw_color_domains: { [key: string]: DomainLayout } = {
  tropical_sunrise: {
    hex: ["#FF9F45", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
    indices: [0, 3, 5, 7, 10],
  },
  cosmic_dreams: {
    hex: ["#3F37C9", "#4895EF", "#4CC9F0", "#4361EE", "#7209B7"],
    indices: [0, 3, 5, 7, 10],
  },
  pastel_sunset: {
    hex: ["#FFAFCC", "#FFC8DD", "#BDE0FE", "#A2D2FF", "#BDB2FF"],
    indices: [0, 3, 5, 7, 10],
  },
  aurora_nights: {
    hex: ["#5EEAD4", "#3B82F6", "#A78BFA", "#9333EA", "#EC4899"],
    indices: [0, 3, 5, 7, 10],
  },
  mellow_berry: {
    hex: ["#FECDD3", "#F472B6", "#D946EF", "#9333EA", "#6B21A8"],
    indices: [0, 3, 5, 7, 10],
  },
  sandy_shores: {
    hex: ["#FDE68A", "#FCD34D", "#F59E0B", "#F97316", "#EA580C"],
    indices: [0, 3, 5, 7, 10],
  },
  mystic_forest: {
    hex: ["#A3E635", "#4ADE80", "#16A34A", "#15803D", "#166534"],
    indices: [0, 3, 5, 7, 10],
  },
  deep_space: {
    hex: ["#0F172A", "#1E3A8A", "#4338CA", "#6366F1", "#A78BFA"],
    indices: [0, 3, 5, 7, 10],
  },
};
