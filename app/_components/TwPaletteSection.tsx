import React, { useEffect } from "react";

import { useVariables } from "@/app/store/variables";
import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { GlobalDyesState, useGlobalDyes } from "@/app/store/global_dyes";
import { usePointers } from "@/app/store/pointers";

import { TwColorCard } from "./TwColorCard";

export const TwPaletteSection = () => {
  const { colors } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const pointers = usePointers((state) => state.pointers);
  const setColors = useVariables((state) => state.setColors);

  useEffect(() => {
    setDyes({
      border_dye: colors[1].hex(),
      text_dye: colors[3].hex(),
      border_shadow_dye: colors[5].hex(),
      title_dye: colors[7].hex(),
      bg_dye: colors[9].hex(),
    } as GlobalDyesState);
    setColors(colors);
  }, [colors]);

  return (
    <div className="flex w-[90%] mx-auto justify-center space-x-1 md:space-x-2">
      {colors.map((color: chroma.Color, i: number) => (
        <TwColorCard
          key={i}
          color={color}
          pointer={pointers[i] !== ""}
          index={i}
        />
      ))}
    </div>
  );
};
