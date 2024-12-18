import React from "react";
import chroma from "chroma-js";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const InputHue = () => {
  const border_shadow_dye = useGlobalDyes((state) => state.l11);
  const hue = useVariables((state) => state.hue);
  const setHue = useVariables((state) => state.setHue);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  function onClick(n: number) {
    setHue(n);
    params.set("h", n.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="hue" className="font-bold text-foreground mb-1">
        Hue
      </Label>
      <Input
        id="hue"
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
        value={hue}
        onChange={(e) => onClick(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
