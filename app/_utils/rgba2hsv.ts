import { HSV } from "../types/HSV";
import { RGBA } from "../types/RGBA";

export function rgba2hsv(rgba: RGBA): HSV {
  let h, s, v;
  let { r, g, b, a: _a } = rgba.normalize();

  let max = Math.max(...[r, g, b]);
  let min = Math.min(...[r, g, b]);

  let d = max - min;

  // hue
  if (d === 0) {
    h = d;
  } else {
    if (max === r) {
      h = 60 * (((g - b) / d) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / d + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / d + 4);
    } else {
      h = 0;
    }
  }

  // saturation
  if (max === 0) {
    s = max;
  } else {
    s = d / max;
  }

  // value
  v = max;

  return new HSV(h, s, v, _a);
}
