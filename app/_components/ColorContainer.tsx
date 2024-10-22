import chroma from "chroma-js";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { formatRGBA } from "../_utils";

interface Props {
  colors: chroma.Color[];
  steps: number;
}

let tw_color_scale = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

export const ColorContainer = ({ colors, steps }: Props) => {
  return (
    <div className="flex w-fit mx-auto space-x-2">
      {colors.map((c: any, i: number) => {
        console.log(c);
        return (
          <TooltipProvider>
            <Tooltip delayDuration={0.2}>
              <TooltipTrigger className="cursor-pointer" asChild>
                <div>
                  <div
                    style={{
                      background: c,
                    }}
                    className="h-12 w-16 rounded"
                  />
                  <span className="text-slate-700 font-semibold text-sm">
                    {tw_color_scale[i]}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                style={{
                  background: `${formatRGBA({
                    r: chroma.hex(c).rgb()[0] * 0.4,
                    g: chroma.hex(c).rgb()[1] * 0.4,
                    b: chroma.hex(c).rgb()[2] * 0.4,
                    a: 255,
                  })}`,
                }}
              >
                {chroma.hex(c).hex()}
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
