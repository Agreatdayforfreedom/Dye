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

interface Props {
  colorSpace: chroma.InterpolationMode;
  setColorSpace: (space: chroma.InterpolationMode) => void;
}

export const SpaceSelector = ({ colorSpace, setColorSpace }: Props) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor="" className="font-bold text-gray-700 ml-2">
        Space
      </Label>
      <Select
        onValueChange={(val) => setColorSpace(val as chroma.InterpolationMode)}
        value={colorSpace}
      >
        <SelectTrigger className="m-1 w-[180px]">
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
