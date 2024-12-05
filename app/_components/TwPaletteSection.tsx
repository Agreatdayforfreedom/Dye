import React, { useEffect } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { useVariables } from "@/app/store/variables";
import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { GlobalDyesState, useGlobalDyes } from "@/app/store/global_dyes";
import { usePointers } from "@/app/store/pointers";
import { order_by_luminance } from "@/app/_utils/order_by_luminance";

import { TwColorCard } from "./TwColorCard";
import { Shuffle } from "lucide-react";

export const TwPaletteSection = () => {
  const { colors } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const pointers = usePointers((state) => state.pointers);
  const setColors = useVariables((state) => state.setColors);
  const ordered = order_by_luminance(colors.map((c) => c.hex()));

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
    <div className="flex w-[90%] mx-auto justify-center space-x-1 mt-5 md:space-x-2">
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
