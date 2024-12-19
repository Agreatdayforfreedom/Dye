import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputSaturation = () => {
  const saturation = useVariables((state) => state.saturation);
  const setSaturation = useVariables((state) => state.setSaturation);

  function onClick(n: number) {
    setSaturation(n);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="saturation" className="font-bold text-foreground mb-1">
        Saturation
      </Label>
      <Input
        id="saturation"
        style={{
          outline: 0,
          boxShadow: `0px 0px 0px 2px rgba(var(--border-primary), 0.5)`,
          borderColor: "rgb(var(--border-primary))",
        }}
        type="number"
        value={saturation}
        onChange={(e) => onClick(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
