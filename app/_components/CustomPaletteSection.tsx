import React, { useEffect } from "react";

import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

import { CustomColorCard } from "./CustomColorCard";

export const CustomPaletteSection = () => {
  const { colors, steps } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const setColors = useVariables((state) => state.setColors);
  useEffect(() => {
    setDyes({
      border_dye: colors[1].hex(),
      text_dye: colors[3].hex(),
      border_shadow_dye: colors[5].hex(),
      title_dye: colors[7].hex(),
      bg_dye: colors[2].hex(),
    });
    setColors(colors);
  }, [colors]);

  return (
    <div style={{ width: 48 * steps }} className="flex mx-auto ">
      {colors.map((color: chroma.Color, i: number) => (
        <CustomColorCard key={i} color={color} />
      ))}
    </div>
  );
};
