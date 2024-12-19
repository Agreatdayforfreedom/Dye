import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useVariables } from "@/app/store/variables";

export const InputName = () => {
  const name = useVariables((state) => state.name);
  const setName = useVariables((state) => state.setName);

  function onClick(n: string) {
    setName(n);
  }
  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="name" className="font-bold text-foreground mb-1">
        Name
      </Label>
      <Input
        id="name"
        className="sm:max-w-80 w-full"
        style={{
          outline: 0,
          boxShadow: `0px 0px 0px 2px rgba(var(--border-primary), 0.5)`,
          borderColor: "rgb(var(--border-primary))",
        }}
        type="text"
        value={name}
        onChange={(e) => onClick(e.target.value)}
      />
    </div>
  );
};
