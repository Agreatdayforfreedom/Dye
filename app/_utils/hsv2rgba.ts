import { HSV } from "../types/HSV";
import { RGBA } from "../types/RGBA";

export function hsv2rgba(hsv: HSV): RGBA {
  let r, g, b, a, c, x, m;
  let { h, s, v, a: _a } = hsv;
  a = _a;

  c = v * s;
  x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  m = v - c;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return new RGBA((r! + m) * 255, (g! + m) * 255, (b! + m) * 255, a * 255);
}
