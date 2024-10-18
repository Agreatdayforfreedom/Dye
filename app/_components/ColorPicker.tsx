"use client";

import { useEffect, useState } from "react";
import { RGBA } from "../types/RGBA";
import { HsvColorPicker, RgbaColor, RgbaColorPicker } from "react-colorful";
import { formatRGBA } from "../_utils";
import { Popover, PopoverTrigger } from "../../components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

interface Props {
  color: RgbaColor;
  setColor: (color: RgbaColor) => void;
}

export const ColorPicker = ({ color, setColor }: Props) => {
  return (
    <Popover>
      <PopoverTrigger
        className="size-8"
        style={{
          background: formatRGBA(
            new RGBA(color?.r, color?.g, color?.b, (color.a || 1) * 255)
          ),
        }}
      />
      <PopoverContent>
        <RgbaColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
};
