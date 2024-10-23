import React from "react";

import chroma from "chroma-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

export const SpaceSelector = () => {
  const dye = useGlobalDyes((state) => state.dye3);
  const colorSpace = useVariables((state) => state.colorSpace);
  const setColorSpace = useVariables((state) => state.setColorSpace);

  return (
    <div className="flex flex-col">
      <Label htmlFor="space" className="font-bold text-gray-700 ml-2">
        Space
      </Label>
      <Select
        onValueChange={(val) => setColorSpace(val as chroma.InterpolationMode)}
        value={colorSpace}
      >
        <SelectTrigger
          id="space"
          style={
            dye
              ? {
                  outline: 0,
                  boxShadow: `0px 0px 0px 2px ${chroma(dye).alpha(0.4).hex()}`,
                  borderColor: dye,
                }
              : {}
          }
          className="m-1 w-[180px]"
        >
          <SelectValue placeholder="Space" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rgb">Rgb</SelectItem>
          <SelectItem value="hsv">Hsv</SelectItem>
          <SelectItem value="oklch">Oklch</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
