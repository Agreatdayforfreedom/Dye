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
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const SpaceSelector = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const colorSpace = useVariables((state) => state.colorSpace);
  const setColorSpace = useVariables((state) => state.setColorSpace);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  function onClick(n: chroma.InterpolationMode) {
    setColorSpace(n);
    params.set("cs", n.toString());
    router.replace(`${pathname}?${params.toString()}`);
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
