import React, { useEffect } from "react";

import { useVariables } from "@/app/store/variables";
import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { GlobalDyesState, useGlobalDyes } from "@/app/store/global_dyes";
import { usePointers } from "@/app/store/pointers";
import { TooltipProvider } from "@/components/ui/tooltip";

import { TwColorCard } from "./TwColorCard";
import { luminance } from "../_utils/luminance";

export const TwPaletteSection = () => {
  const { colors } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const pointers = usePointers((state) => state.pointers);
  const setColors = useVariables((state) => state.setColors);
  const setName = useVariables((state) => state.setName);
  let unordered: { [key: string]: string } = {};
  let lerp = colors.map((c) => c.hex());
  for (const key in lerp) {
    unordered[luminance(lerp[key])] = lerp[key];
  }
  let ordered = Object.keys(unordered)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .reduce((store: string[], key: string) => {
      store.push(unordered[key]);
      return store;
    }, []);
  useEffect(() => {
    setDyes({
      l1: ordered[0],
      l2: ordered[1],
      l3: ordered[2],
      l4: ordered[3],
      l5: ordered[4],
      l6: ordered[5],
      l7: ordered[6],
      l8: ordered[7],
      l9: ordered[8],
      l10: ordered[9],
      l11: ordered[10],
    } as GlobalDyesState);
    setColors(colors);
  }, [colors]);

  return (
    <div className="flex w-[90%] mx-auto justify-center space-x-1 md:space-x-2">
      <TooltipProvider>
        {colors.map((color: chroma.Color, i: number) => (
          <TwColorCard
            key={i}
            color={color}
            pointer={pointers[i] !== ""}
            index={i}
          />
        ))}
      </TooltipProvider>
    </div>
  );
};
