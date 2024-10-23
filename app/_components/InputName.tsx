import React from "react";
import chroma from "chroma-js";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

export const InputName = () => {
  const dye = useGlobalDyes((state) => state.dye3);
  const name = useVariables((state) => state.name);
  const setName = useVariables((state) => state.setName);

  return (
    <div className="flex flex-col ">
      <Label htmlFor="name" className={"font-bold text-gray-700 ml-2"}>
        Name
      </Label>
      <Input
        id="name"
        className="w-64 m-1"
        style={
          dye
            ? {
                outline: 0,
                boxShadow: `0px 0px 0px 2px ${chroma(dye).alpha(0.4).hex()}`,
                borderColor: dye,
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
