import React from "react";

import { usePointersDomain } from "@/app/store/pointers";
import { useVariables } from "@/app/store/variables";
import { usePersistentStore } from "@/app/store/persistent_domain";

export const SavePalette = () => {
  const { setDomain } = usePersistentStore();
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  return (
    <button
      onClick={() => {
        setDomain(name, domain);
      }}
      className="text-bold text-lg p-2 pb-0"
    >
      Save
    </button>
  );
};
