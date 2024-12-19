import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputHue = () => {
  const hue = useVariables((state) => state.hue);
  const setHue = useVariables((state) => state.setHue);

  function onClick(n: number) {
    setHue(n);
  }

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="hue" className="font-bold text-foreground mb-1">
        Hue
      </Label>
      <Input
        id="hue"
        style={{
          outline: 0,
          boxShadow: `0px 0px 0px 2px rgba(var(--border-primary), 0.5)`,
          borderColor: "rgb(var(--border-primary))",
        }}
        type="number"
        value={hue}
        onChange={(e) => onClick(parseInt(e.target.value || "0"))}
      />
    </div>
  );
};
