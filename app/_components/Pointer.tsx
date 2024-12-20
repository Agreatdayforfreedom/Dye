import chroma from "chroma-js";
import { MousePointer2 } from "lucide-react";
import React from "react";
import { usePointers } from "../store/pointers";

interface Props {
  color: chroma.Color;
  index: number;
}

export const Pointer = ({ color }: Props) => {
  return (
    <MousePointer2
      strokeWidth={0.2}
      className="pointer-down absolute -top-6 cursor-pointer stroke-[hsl(var(--foreground))]"
      style={{
        fill: color.darken(0.1).hex(),
      }}
    />
  );
};
