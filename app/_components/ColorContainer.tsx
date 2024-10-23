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
import { usePointers, usePointersDomain } from "../store/pointers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Input } from "../../components/ui/input";
import { HashIcon } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { useVariables } from "../store/variables";
import { useGlobalDyes } from "../store/global_dyes";
import { useLerpColors } from "../_hooks/useLerpColors";

export const ColorContainer = () => {
  const pointers = usePointers((state) => state.pointers);
  const colors = useLerpColors();
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
