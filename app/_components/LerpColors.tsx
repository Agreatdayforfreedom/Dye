"use client";

import React, { useState } from "react";
import { formatRGBA, lerpHSV, lerpRGBA } from "../_utils";
import { RGBA } from "../types/RGBA";
import { HSV } from "../types/HSV";
import { rgba2hsv } from "../_utils/rgba2hsv";
import { hsv2rgba } from "../_utils/hsv2rgba";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { ColorPicker } from "./ColorPicker";

// function hsv_to_hsl(h: number, s: number, v: number) {
//   // both hsv and hsl values are in [0, 1]
//   var l = ((2 - s) * v) / 2;

//   if (l != 0) {
//     if (l == 1) {
//       s = 0;
//     } else if (l < 0.5) {
//       s = (s * v) / (l * 2);
//     } else {
//       s = (s * v) / (2 - l * 2);
//     }
//   }

//   return { h, s, l };
// }

let initializeLeftColor = (): RgbaColor => {
  return {
    r: 0,
    g: 255,
    b: 255,
    a: 255,
  };
};
let initializeRightColor = (): RgbaColor => {
  return {
    r: 255,
    g: 0,
    b: 0,
    a: 255,
  };
};
export const LerpColors = () => {
  const [leftColor, setLeftColor] = useState<RgbaColor>(initializeLeftColor);
  const [rightColor, setRightColor] = useState<RgbaColor>(initializeRightColor);

  let a = new RGBA(
    leftColor.r,
    leftColor.g,
    leftColor.b,
    (leftColor.a || 1) * 255
  );
  let b = new RGBA(
    rightColor.r,
    rightColor.g,
    rightColor.b,
    (rightColor.a || 1) * 255
  );
  let values: RGBA[] = [];
  let steps = 20;
  for (let i = 0; i < steps - 1; i++) {
    values.push(lerpRGBA(a, b, i / steps));
  }
  let values_hsv: HSV[] = [];
  let ah = rgba2hsv(a);
  let bh = rgba2hsv(b);
  for (let i = 0; i < steps - 1; i++) {
    values_hsv.push(lerpHSV(ah, bh, i / steps));
  }

  return (
    <div className="size-full flex items-end justify-center">
      <ColorPicker color={leftColor} setColor={setLeftColor} />
      <div>
        <div className="flex">
          {values.map((c) => {
            return (
              <div>
                <div
                  style={{
                    background: formatRGBA(c),
                    width: `${500 / steps}px`,
                  }}
                  className="h-16"
                />
              </div>
            );
          })}
        </div>
        <div className="flex">
          {values_hsv.map((c: any) => {
            return (
              <div
                style={{
                  background: formatRGBA(hsv2rgba(c)),
                  width: `${500 / steps}px`,
                }}
                className="h-16"
              />
            );
          })}
        </div>
      </div>
      <ColorPicker color={rightColor} setColor={setRightColor} />
    </div>

    // </div>
  );
};
