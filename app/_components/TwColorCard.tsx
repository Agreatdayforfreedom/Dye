import React from "react";
import chroma from "chroma-js";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopy } from "@/app/_hooks/useCopy";

import { ColorPicker } from "./ColorPicker";
import { Pointer } from "./Pointer";
import { getContrastYIQ } from "../_utils/yiq";

interface Props {
  color: chroma.Color;
  pointer: boolean;
  index: number;
}

export const TwColorCard = ({ color, pointer, index }: Props) => {
  const [isCopied, onCopy] = useCopy(2000);

  return (
    <div
      className="flex flex-col items-center relative
       lg:h-[3.25rem] lg:w-20 
          md:h-12        md:w-16 
          h-10         w-full"
    >
      {pointer ? <Pointer color={color} index={index} /> : null}
      <TooltipProvider>
        <Tooltip delayDuration={0.2}>
          <TooltipTrigger className="cursor-pointer size-full" asChild>
            <div>
              <ColorPicker color={color.hex()} index={index} />
            </div>
          </TooltipTrigger>
          <TooltipContent
            style={{
              background: color.darken(2).hex(),
              color: getContrastYIQ(color.darken(2).hex()),
            }}
            className="cursor-pointer"
            onClick={() => onCopy(color.hex())}
          >
            {isCopied ? (
              <span className="font-bold">Copied!</span>
            ) : (
              color.hex()
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
