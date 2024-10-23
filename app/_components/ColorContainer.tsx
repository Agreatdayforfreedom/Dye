import chroma from "chroma-js";
import React, { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { tw_color_scale } from "../constants";
import { Pointer } from "./Pointer";
import { usePointers } from "../store/pointers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Input } from "../../components/ui/input";
import { HashIcon } from "lucide-react";
import { ColorPicker } from "./ColorPicker";

interface Props {
  colors: chroma.Color[];
  steps: number;
}

export const ColorContainer = ({ colors, steps }: Props) => {
  const setPointer = usePointers((state) => state.setPointer);
  const pointers = usePointers((state) => state.pointers);

  return (
    <div className="flex w-fit mx-auto space-x-2">
      {colors.map((color: chroma.Color, i: number) => {
        return (
          <div
            key={tw_color_scale[i]}
            className="flex flex-col items-center relative"
          >
            {pointers[i] !== "" ? <Pointer color={color} index={i} /> : null}
            <TooltipProvider>
              <Tooltip delayDuration={0.2}>
                <TooltipTrigger className="cursor-pointer" asChild>
                  <div>
                    <ColorPicker color={chroma(color).hex()} index={i} />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  style={{
                    background: chroma(color).darken(2).hex(),
                  }}
                >
                  {color.hex()}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}
    </div>
  );
};
