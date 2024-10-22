"use client";

import React, { useState } from "react";
import chroma from "chroma-js";

import { Input } from "@/components/ui/input";

import { ColorPicker } from "./ColorPicker";
import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";

export const LerpColors = () => {
  const [leftColor, setLeftColor] = useState<string>("ffffff");
  const [rightColor, setRightColor] = useState<string>("00ffff");
  const [saturation, setSaturation] = useState<number>(0);
  const [colorSpace, setColorSpace] = useState<chroma.InterpolationMode>("rgb");

  let steps = 11;

  // todo: set pointer and fix the saturation
  let last = chroma
    .scale([chroma.hex(leftColor), chroma.hex(rightColor)])
    .mode(colorSpace)
    .colors(steps)
    .map((x) => chroma.hex(x).saturate(saturation));

  return (
    <>
      <div className="flex w-11/12 h-1/3 py-8 justify-between mx-auto">
        <Input
          className="max-w-48"
          type="number"
          value={saturation}
          onChange={(e) => setSaturation(parseInt(e.target.value))}
        />
        <div className="flex items-end">
          <SpaceSelector
            colorSpace={colorSpace}
            setColorSpace={setColorSpace}
          />
          <div>
            <ColorPicker
              color={leftColor}
              setColor={setLeftColor}
              label="Left color"
            />
            <ColorPicker
              color={rightColor}
              setColor={setRightColor}
              label="Right color"
            />
          </div>
        </div>
      </div>
      <ColorContainer colors={last} steps={steps} />
    </>
  );
};
