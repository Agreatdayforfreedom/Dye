import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputBrightness = () => {
  const brightness = useVariables((state) => state.brightness);
  const setBrightness = useVariables((state) => state.setBrightness);

  function onClick(n: number) {
    setBrightness(n);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="brightness" className="font-bold text-foreground mb-1">
        Brightness
      </Label>
      <Input
        id="brightness"
        style={{
          outline: 0,
          boxShadow: `0px 0px 0px 2px rgba(var(--border-primary), 0.5)`,
          borderColor: "rgb(var(--border-primary))",
        }}
        type="number"
        value={brightness}
        onChange={(e) => onClick(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
