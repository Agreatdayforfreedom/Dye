"use client";

import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

import { Input } from "@/components/ui/input";

import { ColorPicker } from "./ColorPicker";
import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { Label } from "../../components/ui/label";
import { useGlobalDyes } from "../store/global_dyes";
import { cn } from "../../lib/utils";

export const LerpColors = () => {
  const [leftColor, setLeftColor] = useState<string>("ffffff");
  const [rightColor, setRightColor] = useState<string>("00ffff");
  const [saturation, setSaturation] = useState<number>(0);
  const [name, setName] = useState<string>("Autumn");
  const [colorSpace, setColorSpace] = useState<chroma.InterpolationMode>("rgb");

  const setDye = useGlobalDyes((state) => state.setDye);
  let steps = 11;
  const dyes: string[] = [];
  // todo: set pointer and fix the saturation
  let last = chroma
    .scale([chroma.hex(leftColor), chroma.hex(rightColor)])
    .mode(colorSpace)
    .colors(steps)
    .map((x, i) => {
      let hex = chroma.hex(x).saturate(saturation);
      if ((i & 1) === 1) {
        dyes.push(hex.hex());
      }
      return hex;
    });
  useEffect(() => {
    setDye({
      dye1: dyes[0],
      dye2: dyes[1],
      dye3: dyes[2],
      dye4: dyes[3],
      dye5: dyes[4],
    });
    globalThis.__box_focused = {
      outline: 0,
      boxShadow: `0px 0px 0px 2px ${chroma(dyes[4]).alpha(0.4).hex()}`,
      borderColor: dyes[4],
    };
  }, [rightColor, colorSpace, leftColor]);
  return (
    <>
      <div className="flex w-11/12 h-1/3 py-8 justify-end mx-auto">
        <div className="flex items-end space-x-2">
          <div className="flex flex-col ">
            <Label htmlFor="name" className={"font-bold text-gray-700 ml-2"}>
              Name
            </Label>
            <Input
              id="name"
              className="w-64 m-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="saturation"
              className="font-bold text-gray-700 ml-2"
            >
              Saturation
            </Label>
            <Input
              id="saturation"
              className="max-w-48 m-1"
              type="number"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
            />
          </div>
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
