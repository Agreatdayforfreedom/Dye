"use client";

import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { useGlobalDyes } from "../store/global_dyes";
import { usePointersDomain } from "../store/pointers";

export const LerpColors = () => {
  const [saturation, setSaturation] = useState<number>(0);
  const [name, setName] = useState<string>("Autumn");
  const [colorSpace, setColorSpace] = useState<chroma.InterpolationMode>("rgb");

  const { indices, hex } = usePointersDomain();

  const dye = useGlobalDyes((state) => state.dye3);
  const setDye = useGlobalDyes((state) => state.setDye);

  let steps = 11;
  const dyes: string[] = [];
  let last = chroma
    .scale([...hex])
    .mode(colorSpace)
    .domain([...indices])
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
  }, [colorSpace]);
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
              style={
                dye
                  ? {
                      outline: 0,
                      boxShadow: `0px 0px 0px 2px ${chroma(dye)
                        .alpha(0.4)
                        .hex()}`,
                      borderColor: dye,
                    }
                  : {}
              }
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
              style={
                dye
                  ? {
                      outline: 0,
                      boxShadow: `0px 0px 0px 2px ${chroma(dye)
                        .alpha(0.4)
                        .hex()}`,
                      borderColor: dye,
                    }
                  : {}
              }
              type="number"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
            />
          </div>
          <SpaceSelector
            colorSpace={colorSpace}
            setColorSpace={setColorSpace}
          />
        </div>
      </div>
      <ColorContainer colors={last} steps={steps} />
    </>
  );
};
