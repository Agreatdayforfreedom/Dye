import { RgbaColor } from "react-colorful";

export function formatRGBA(raw: RgbaColor) {
  return `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a / 255})`;
}
