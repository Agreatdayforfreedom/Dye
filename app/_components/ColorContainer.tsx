import chroma from "chroma-js";
import React, { useEffect } from "react";

import { usePointers } from "@/app/store/pointers";
import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { useGlobalDyes } from "@/app/store/global_dyes";

import { ColorCard } from "./ColorCard";
import { CopyPalette } from "./CopyPalette";
import { Separator } from "../../components/ui/separator";

export const ColorContainer = () => {
  const pointers = usePointers((state) => state.pointers);
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const border_dye = useGlobalDyes((state) => state.border_dye);
  const colors = useLerpColors();

  useEffect(() => {
    setDyes({
      border_dye: colors[1].hex(),
      text_dye: colors[3].hex(),
      border_shadow_dye: colors[5].hex(),
      title_dye: colors[7].hex(),
      bg_dye: colors[9].hex(),
    });
  }, [colors]);

  return (
    <div className="space-y-10">
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
      <Separator
        style={{ background: border_dye }}
        className="w-11/12 mx-auto"
        decorative={true}
      />
      <div className="flex justify-between w-11/12 mx-auto mt-5">
        <div></div>
        <CopyPalette colors={colors} />
      </div>
    </div>
  );
};
