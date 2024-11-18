import React from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalDyes } from "@/app/store/global_dyes";

export const Search = () => {
  const c1 = useGlobalDyes((state) => state.l6);
  const c2 = useGlobalDyes((state) => state.l8);

  return (
    <div className="w-[80%] sm:max-w-64 flex gap-2">
      <div className="flex relative  w-full">
        <SearchIcon
          className="absolute left-2 top-2"
          size={18}
          strokeWidth={2}
        />
        <Input
          className="pl-8"
          style={{ borderColor: c2 }}
          defaultValue={"Custom palette"}
        />
      </div>
      <Button className="rounded-none font-semibold" style={{ background: c1 }}>
        Search
      </Button>
    </div>
  );
};
