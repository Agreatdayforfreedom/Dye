import React from "react";
import chroma from "chroma-js";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputHue = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.border_shadow_dye);
  const hue = useVariables((state) => state.hue);
  const setHue = useVariables((state) => state.setHue);

  return (
    <div className="flex flex-col">
      <Label htmlFor="hue" className="font-bold text-gray-700 ml-2">
        Hue
      </Label>
      <Input
        id="hue"
        className="max-w-48 m-1"
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
        value={hue}
        onChange={(e) => setHue(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
