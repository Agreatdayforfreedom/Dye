import React from "react";
import chroma from "chroma-js";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getContrastYIQ } from "@/app/_utils/yiq";
import { usePointers } from "@/app/store/pointers";
import { useCopy } from "@/app/_hooks/useCopy";

import { ColorPicker } from "./ColorPicker";
import { Pointer } from "./Pointer";

interface Props {
  color: chroma.Color;
  pointer: boolean;
  index: number;
}

export const TwColorCard = ({ color, pointer, index }: Props) => {
  const stage = usePointers((state) => state.stage);
  return (
    <div
      className="flex flex-col items-center relative
       lg:h-[3.25rem] lg:w-20 
          md:h-12        md:w-16 
          h-11         w-full"
    >
      {stage === "shade" && index !== 5 ? null : pointer ? (
        <Pointer color={color} index={index} />
      ) : null}

      <ColorPicker color={color.hex()} index={index} />
    </div>
  );
};
