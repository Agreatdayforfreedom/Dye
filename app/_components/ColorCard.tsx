import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColorPicker } from "./ColorPicker";
import chroma from "chroma-js";
import { Pointer } from "./Pointer";
import { useCopy } from "../_hooks/useCopy";

interface Props {
  color: chroma.Color;
  pointer: boolean;
  index: number;
}

export const ColorCard = ({ color, pointer, index }: Props) => {
  const [isCopied, onCopy] = useCopy(2000);

  return (
    <div className="flex flex-col items-center relative">
      {pointer ? <Pointer color={color} index={index} /> : null}
      <TooltipProvider>
        <Tooltip delayDuration={0.2}>
          <TooltipTrigger className="cursor-pointer" asChild>
            <div>
              <ColorPicker color={color.hex()} index={index} />
            </div>
          </TooltipTrigger>
          <TooltipContent
            style={{
              background: color.darken(2).hex(),
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
