import React, { useEffect } from "react";

import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { GlobalDyesState, useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

import { CustomColorCard } from "./CustomColorCard";
import { luminance } from "../_utils/luminance";
import { order_by_luminance } from "../_utils/order_by_luminance";

export const CustomPaletteSection = () => {
  const { colors } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
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
    <div style={{ width: 48 }} className="flex mx-auto ">
      {colors.map((color: chroma.Color, i: number) => (
        <CustomColorCard key={i} color={color} />
      ))}
    </div>
  );
};
