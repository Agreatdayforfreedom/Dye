import chroma from "chroma-js";
import React from "react";
import { getContrastYIQ } from "@/app/_utils/yiq";

interface Props {
  color: chroma.Color;
}

export const CustomColorCard = ({ color }: Props) => {
  return (
    <div
      className="flex raw_palette_card_animation h-32 items-center cursor-pointer transition-all duration-300"
      style={{ background: color.hex() }}
    >
      <span
        className="mx-auto hidden font-semibold font-mono"
        style={{ color: getContrastYIQ(color.hex()) }}
      >
        {color.hex().slice(1).toUpperCase()}
      </span>
    </div>
  );
};
