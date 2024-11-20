import chroma from "chroma-js";
import { DomainLayout } from "../types";

export function lerp_colors(
  domain: DomainLayout,
  colorSpace: chroma.InterpolationMode,
  hue: number,
  brightness: number,
  saturation: number,
  steps: number
) {
  const { hex, indices } = domain;
  let no_update_pointer_index = 0;

  return chroma
    .scale([...hex])
    .mode(colorSpace)
    .domain([...indices])
    .colors(steps)
    .map((c, i) => {
      const color = chroma(c);
      const current_hue = color.get("hsv.h") || 0;
      const current_brh = color.get("hsv.v") || 0;
      const current_sat = color.get("hsv.s") || 0;

      let new_hue = current_hue;
      let new_brh = current_brh;
      let new_sat = current_sat;

      if (indices[no_update_pointer_index] != i) {
        new_hue += hue;
        new_brh += brightness / 25;
        new_sat += saturation / 50;
      } else {
        no_update_pointer_index++;
      }

      return color
        .set("hsv.h", new_hue)
        .set("hsv.s", new_sat)
        .set("hsv.v", new_brh);
    });
}
