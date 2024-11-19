import { luminance } from "./luminance";

type HexWithLuminance = { hex: string; luminance: number };

export function order_by_luminance(colors: string[]) {
  let unordered: HexWithLuminance[] = [];

  for (const key in colors) {
    unordered.push({
      hex: colors[key],
      luminance: luminance(colors[key]),
    });
  }
  let ordered = unordered
    .sort((a, b) => b.luminance - a.luminance)
    .map((hl) => hl.hex);

  return ordered;
}
