"use client";

import React, { useState } from "react";
import { RGBA } from "../types/RGBA";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { ColorPicker } from "./ColorPicker";
import chroma from "chroma-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
  const [colorSpace, setColorSpace] = useState<chroma.InterpolationMode>("rgb");
  let a = {
    r: leftColor.r,
    g: leftColor.g,
    b: leftColor.b,
    a: (leftColor.a || 1) * 255,
  };
  let b = {
    r: rightColor.r,
    g: rightColor.g,
    b: rightColor.b,
    a: (rightColor.a || 1) * 255,
  };
  let steps = 20;

  // todo: set pointer and fix the saturation
  let last = chroma
    .scale([chroma.rgb(a.r, a.g, a.b), chroma.rgb(b.r, b.g, b.b)])
    .mode(colorSpace)
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
        <Select
          onValueChange={(val) =>
            setColorSpace(val as chroma.InterpolationMode)
          }
          value={colorSpace}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Space" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rgb">Rgb</SelectItem>
            <SelectItem value="hsv">Hsv</SelectItem>
            <SelectItem value="oklch">Oklch</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
