import React from "react";
import chroma from "chroma-js";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const InputSaturation = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const saturation = useVariables((state) => state.saturation);
  const setSaturation = useVariables((state) => state.setSaturation);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  function onClick(n: number) {
    setSaturation(n);
    params.set("s", n.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="saturation" className="font-bold text-foreground mb-1">
        Saturation
      </Label>
      <Input
        id="saturation"
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
        value={saturation}
        onChange={(e) => onClick(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
