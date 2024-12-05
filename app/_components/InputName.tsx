import React from "react";
import chroma from "chroma-js";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

export const InputName = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const name = useVariables((state) => state.name);
  const setName = useVariables((state) => state.setName);

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="name" className="font-bold text-foreground mb-1">
        Name
      </Label>
      <Input
        id="name"
        className="sm:max-w-80 w-full"
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
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
