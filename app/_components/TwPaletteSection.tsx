import React, { useEffect } from "react";

import { useVariables } from "@/app/store/variables";
import { useLerpColors } from "@/app/_hooks/useLerpColors";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { usePointers } from "@/app/store/pointers";

import { TwColorCard } from "./TwColorCard";
import { useSearchParams } from "next/navigation";
import { DomainLayout } from "../types";

export const TwPaletteSection = () => {
  const { colors } = useLerpColors();
  const setDyes = useGlobalDyes((state) => state.setDyes);
  const pointers = usePointers((state) => state.pointers);
  const setColors = useVariables((state) => state.setColors);
  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const searchParams = useSearchParams();
  useEffect(() => {
    let domain: DomainLayout = {
      hex: JSON.parse(searchParams.get("p") || "[]"),
      indices: JSON.parse(searchParams.get("i") || "[]"),
    };

    setPointerFromDomain(domain);
  }, []);

  useEffect(() => {
    setDyes({
      border_dye: colors[1].hex(),
      text_dye: colors[3].hex(),
      border_shadow_dye: colors[5].hex(),
      title_dye: colors[7].hex(),
      bg_dye: colors[9].hex(),
    });
    setColors(colors);
  }, [colors]);

  return (
    <div className="flex w-fit space-x-2 mx-auto">
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
