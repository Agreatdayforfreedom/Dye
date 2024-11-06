export function f_rgb(rgba: Array<number>) {
  const [r, g, b, a] = rgba;
  const _r = r.toFixed(0);
  const _g = g.toFixed(0);
  const _b = b.toFixed(0);
  const _a = a?.toFixed(0);

  let rgb = "";
  if (_a) {
    rgb = `rgba(${_r}, ${_g}, ${_b}, ${parseInt(_a) / 255})`;
  } else {
    rgb = `rgb(${_r}, ${_g}, ${_b})`;
  }

  return rgb;
}
export function f_oklch(oklhc: Array<number>) {
  const [l, h, c] = oklhc;
  return `oklch(${(l * 100).toFixed(2)}% ${h.toFixed(2)} ${c.toFixed(2)})`;
}
