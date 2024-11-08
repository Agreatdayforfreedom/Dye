import React from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalDyes } from "@/app/store/global_dyes";

export const Search = () => {
  const bg_dye = useGlobalDyes((state) => state.bg_dye);
  const border_dye = useGlobalDyes((state) => state.border_dye);

  return (
    <div className="max-w-64 flex gap-2">
      <div className="flex relative">
        <SearchIcon
          className="absolute left-2 top-2"
          size={18}
          strokeWidth={2}
        />
        <Input className="pl-8" style={{ borderColor: border_dye }} />
      </div>
      <Button
        className="rounded-none font-semibold"
        style={{ background: bg_dye }}
      >
        Search
      </Button>
    </div>
  );
};
