import React from "react";

import chroma from "chroma-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  colorSpace: chroma.InterpolationMode;
  setColorSpace: (space: chroma.InterpolationMode) => void;
}

export const SpaceSelector = ({ colorSpace, setColorSpace }: Props) => {
  return (
    <Select
      onValueChange={(val) => setColorSpace(val as chroma.InterpolationMode)}
      value={colorSpace}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Space" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rgb">Rgb</SelectItem>
        <SelectItem value="hsv">Hsv</SelectItem>
        <SelectItem value="oklch">Oklch</SelectItem>
      </SelectContent>
    </Select>
  );
};
