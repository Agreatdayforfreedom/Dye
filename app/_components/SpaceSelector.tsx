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
import { useVariables } from "@/app/store/variables";

export const SpaceSelector = () => {
  const colorSpace = useVariables((state) => state.colorSpace);
  const setColorSpace = useVariables((state) => state.setColorSpace);

  function onClick(n: chroma.InterpolationMode) {
    setColorSpace(n);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="space" className="font-bold text-foreground mb-1">
        Space
      </Label>
      <Select
        onValueChange={(val) => onClick(val as chroma.InterpolationMode)}
        value={colorSpace}
      >
        <SelectTrigger
          id="space"
          style={{
            outline: 0,
            boxShadow: `0px 0px 0px 2px rgba(var(--border-primary), 0.5)`,
            borderColor: "rgb(var(--border-primary))",
          }}
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
