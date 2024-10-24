import chroma from "chroma-js";
import React from "react";

import { usePointers } from "@/app/store/pointers";
import { useLerpColors } from "@/app/_hooks/useLerpColors";

import { ColorCard } from "./ColorCard";

export const ColorContainer = () => {
  const pointers = usePointers((state) => state.pointers);
  const colors = useLerpColors();

  return (
    <div className="flex w-fit mx-auto space-x-2">
      {colors.map((color: chroma.Color, i: number) => {
        return (
          <ColorCard
            key={i}
            color={color}
            pointer={pointers[i] !== ""}
            index={i}
          />
        );
      })}
    </div>
  );
};
