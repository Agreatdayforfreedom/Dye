import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";

import { useVariables } from "@/app/store/variables";
import { Separator } from "@/components/ui/separator";

import { CopyPalette } from "./CopyPalette";
import { TwPaletteSection } from "./TwPaletteSection";
import { CustomPaletteSection } from "./CustomPaletteSection";
import { Palettes } from "./Palettes";
import { SavePalette } from "./SavePalette";

export const ColorContainer = () => {
  const type = useVariables((state) => state.type);

  let palette = null;

  if (type == "tw") {
    palette = <TwPaletteSection />;
  } else if (type == "custom") {
    palette = <CustomPaletteSection />;
  }

  return <div>{palette}</div>;
};
