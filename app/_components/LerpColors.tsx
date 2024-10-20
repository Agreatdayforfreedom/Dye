"use client";

import React, { useState } from "react";
import { formatRGBA, lerpHSV, lerpRGBA } from "../_utils";
import { RGBA } from "../types/RGBA";
import { HSV } from "../types/HSV";
import { rgba2hsv } from "../_utils/rgba2hsv";
import { hsv2rgba } from "../_utils/hsv2rgba";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { ColorPicker } from "./ColorPicker";
import chroma from "chroma-js";

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
  const [saturation, setSaturation] = useState<number>(0);
  const [saturationFactor, setSaturationFactor] = useState(1);
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
  let steps = 20;

  // todo: set pointer and fix the saturation
  let last = chroma
    .scale([chroma.rgb(a.r, a.g, a.b), chroma.rgb(b.r, b.g, b.b)])
    .mode("rgb")
    .colors(steps)
    .map((x) => chroma.hex(x).saturate(saturation));

  return (
    <div className="size-full flex items-end justify-center">
      <ColorPicker color={leftColor} setColor={setLeftColor} />
      <div>
        <div className="flex">
          <div className="flex">
            {last.map((c: any) => {
              return (
                <div
                  style={{
                    background: c,
                    width: `${500 / steps}px`,
                  }}
                  className="h-16"
                />
              );
            })}
          </div>
        </div>
        <ColorPicker color={rightColor} setColor={setRightColor} />
        <input
          type="number"
          value={saturation}
          onChange={(e) => setSaturation(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};
