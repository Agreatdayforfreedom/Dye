import chroma from "chroma-js";
import { MousePointer2 } from "lucide-react";
import React from "react";
import { usePointers } from "../store/pointers";

interface Props {
  color: chroma.Color;
  index: number;
  // setPointer: (index: number) => void;
}

export const Pointer = ({ color, index }: Props) => {
  const undoPointer = usePointers((state) => state.undoPointer);
  return (
    <MousePointer2
      onClick={() => undoPointer(index)}
      strokeWidth={0.5}
      className="pointer-down stroke-none absolute -top-6 cursor-pointer"
      style={{
        fill: color.hex(),
        stroke: color.darken(1).hex(),
      }}
    />
  );
};
