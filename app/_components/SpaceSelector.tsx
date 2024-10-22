import React, { useActionState } from "react";

import chroma from "chroma-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGlobalDyes } from "../store/global_dyes";

interface Props {
  colorSpace: chroma.InterpolationMode;
  setColorSpace: (space: chroma.InterpolationMode) => void;
}

export const SpaceSelector = ({ colorSpace, setColorSpace }: Props) => {
  const dye = useGlobalDyes((state) => state.dye3);
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
