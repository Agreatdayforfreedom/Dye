import React from "react";
import chroma from "chroma-js";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputSaturation = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const saturation = useVariables((state) => state.saturation);
  const setSaturation = useVariables((state) => state.setSaturation);

  return (
    <div className="flex flex-col mx-2">
      <Label htmlFor="saturation" className="font-bold text-foreground ml-2">
        Saturation
      </Label>
      <Input
        id="saturation"
        className="xs:max-w-48 m-1"
        style={
          border_shadow_dye
            ? {
                outline: 0,
                boxShadow: `0px 0px 0px 2px ${chroma(border_shadow_dye)
                  .alpha(0.4)
                  .hex()}`,
                borderColor: border_shadow_dye,
              }
            : {}
        }
        type="number"
        value={saturation}
        onChange={(e) => setSaturation(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
