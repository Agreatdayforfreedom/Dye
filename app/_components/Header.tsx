"use client";

import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";

export const Header = () => {
  const title_dye = useGlobalDyes((state) => state.title_dye);
  const border_dye = useGlobalDyes((state) => state.border_dye);
  const text_dye = useGlobalDyes((state) => state.text_dye);
  const bg_dye = useGlobalDyes((state) => state.bg_dye);

  const type = useVariables((state) => state.type);
  const setType = useVariables((state) => state.setType);

  return (
    <header
      className="h-12 w-full border-b"
      style={{ borderColor: border_dye }}
    >
      <div className="h-full w-11/12 flex items-center justify-between mx-auto">
        <div className="flex space-x-1 items-end">
          <h1 style={{ color: title_dye }} className="text-xl font-bold">
            Dye
          </h1>
          <p className="text-sm font-semibold" style={{ color: text_dye }}>
            Palette generator
          </p>
        </div>
        <div>
          <button
            onClick={() => setType("tw")}
            style={type == "tw" ? { background: bg_dye } : {}}
          >
            Tailwind
          </button>
          <button
            onClick={() => setType("custom")}
            style={type == "custom" ? { background: bg_dye } : {}}
          >
            Custom
          </button>
        </div>
      </div>
    </header>
  );
};
