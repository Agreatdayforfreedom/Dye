import React from "react";
import chroma from "chroma-js";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputBrightness = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const brightness = useVariables((state) => state.brightness);
  const setBrightness = useVariables((state) => state.setBrightness);

  return (
    <div className="flex flex-col w-full mx-2">
      <Label
        htmlFor="brightness"
        className="font-bold text-foreground ml-2 mb-1"
      >
        Brightness
      </Label>
      <Input
        id="brightness"
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
        value={brightness}
        onChange={(e) => setBrightness(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
