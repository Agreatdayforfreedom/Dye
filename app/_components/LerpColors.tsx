"use client";

import React, { useState } from "react";
import chroma from "chroma-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { ColorPicker } from "./ColorPicker";
import { ColorContainer } from "./ColorContainer";

export const LerpColors = () => {
  const [leftColor, setLeftColor] = useState<string>("#ffffff");
  const [rightColor, setRightColor] = useState<string>("#00ffff");
  const [saturation, setSaturation] = useState<number>(0);
  const [colorSpace, setColorSpace] = useState<chroma.InterpolationMode>("rgb");

  let steps = 20;

  // todo: set pointer and fix the saturation
  let last = chroma
    .scale([chroma.hex(leftColor), chroma.hex(rightColor)])
    .mode(colorSpace)
    .colors(steps)
    .map((x) => chroma.hex(x).saturate(saturation));

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div>
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

        <Input
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
      <ColorContainer colors={last} steps={steps} />
    </div>
  );
};
