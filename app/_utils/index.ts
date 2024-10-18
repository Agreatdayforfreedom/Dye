import { HSV } from "../types/HSV";
import { RGBA } from "../types/RGBA";

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpRGBA(a: RGBA, b: RGBA, t: number): RGBA {
  // prettier-ignore
  return new RGBA(
    lerp(a.r, b.r, t) * 1, 
    lerp(a.g, b.g, t) * 1, 
    lerp(a.b, b.b, t) * 1, 
    lerp(a.a, b.a, t) * 1
  );
}

function lerpAngle(a: number, b: number, t: number) {
  let diff = (b - a + 360) % 360;
  if (diff > 180) {
    diff -= 360;
  }
  return (a + diff * t + 360) % 360;
}

export function lerpHSV(a: HSV, b: HSV, t: number) {
  // let h: number;
  // let d = b.h - a.h;

  // if (a.h > b.h) {
  //   let th = b.h;
  //   b.h = a.h;
  //   a.h = th;
  //   d = -d;
  //   t = 1 - t;
  // }
  // if (d >= 0.5) {
  //   a.h = a.h + 1; // 360deg
  //   h = (a.h + t * (b.h - a.h)) % 1; // 360deg
  // } else {
  //   h = a.h + t * d;
  // }
  // prettier-ignore
  return new HSV(
    lerpAngle(a.h, b.h, t),
    lerp(a.s, b.s, t),
    lerp(a.v, b.v, t),
    lerp(a.a, b.a, t)
  );
}

// export function normalizeRGBA(rgba: RGBA) {
//   return new RGBA(rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a / 255);
// }

export function formatRGBA(raw: RGBA) {
  return `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a / 255})`;
}
