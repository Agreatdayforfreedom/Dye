import chroma from "chroma-js";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tw_color_scale } from "../constants";

interface Props {
  colors: chroma.Color[];
  steps: number;
}

export const ColorContainer = ({ colors, steps }: Props) => {
  return (
    <div className="flex w-fit mx-auto space-x-2">
      {colors.map((color: chroma.Color, i: number) => {
        return (
          <TooltipProvider key={tw_color_scale[i]}>
            <Tooltip delayDuration={0.2}>
              <TooltipTrigger className="cursor-pointer" asChild>
                <div>
                  <div
                    style={{
                      background: color.hex(),
                      borderColor: color.darken(0.1).hex(),
                    }}
                    className="h-12 w-16 rounded border"
                  />
                  <span className="text-slate-700 font-semibold text-sm">
                    {tw_color_scale[i]}
                  </span>
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
        );
      })}
      {/* {colors.map((c: any) => {
        return (
          <div
            style={{
              background: c,
              width: `${500 / steps}px`,
            }}
            className="h-16"
          />
        );
      })} */}
    </div>
  );
};
