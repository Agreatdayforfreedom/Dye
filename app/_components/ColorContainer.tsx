import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";

import { useVariables } from "@/app/store/variables";
import { Separator } from "@/components/ui/separator";

import { CopyPalette } from "./CopyPalette";
import { TwPaletteSection } from "./TwPaletteSection";
import { CustomPaletteSection } from "./CustomPaletteSection";
import { Palettes } from "./Palettes";

export const ColorContainer = () => {
  const border_dye = useGlobalDyes((state) => state.border_dye);
  const type = useVariables((state) => state.type);

  let palette = null;

  if (type == "tw") {
    palette = <TwPaletteSection />;
  } else if (type == "custom") {
    palette = <CustomPaletteSection />;
  }

  return (
    <div>
      {palette}
      <div className="flex justify-between w-[80%] mx-auto mt-10">
        <div></div>
        <div>
          <CopyPalette />
        </div>
      </div>
      <Separator
        style={{ background: border_dye }}
        className="w-11/12 mx-auto"
        decorative={true}
      />
      <div className="flex justify-between w-11/12 mx-auto mt-5">
        <Palettes />
      </div>
    </div>
  );
};
