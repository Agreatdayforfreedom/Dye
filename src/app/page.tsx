import Image from "next/image";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRGB(a: Array<number>, b: Array<number>, n: number) {
  let results = [];
  let t = 0;

  // prettier-ignore
  while (t < n + 1) {
    results.push(
      [
        lerp(a[0], b[0], t * 0.01),
        lerp(a[1], b[1], t * 0.01),
        lerp(a[2], b[2], t * 0.01),
        lerp(a[3], b[3], t * 0.01),
      ]
    )
    
    t++;
  }
  console.log(results);
  return results;
}

function format(raw: Array<number>) {
  return `rgba(${raw[0]},${raw[1]},${raw[2]},${raw[3] / 255})`;
}

export default function Home() {
  let arr = Array.from(Array(10).keys());

  let gradient = lerpRGB([0, 255, 255, 255], [255, 0, 0, 255], 100);

  return (
    <div className="size-full flex items-center justify-center">
      <div className="flex">
        {gradient.map((c) => {
          return <div style={{ background: format(c), width: `${500 / 100}px` }} className="h-32" />;
        })}
      </div>
    </div>
  );
}
