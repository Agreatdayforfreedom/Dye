"use client";

import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";
import { getContrastYIQ } from "../_utils/yiq";
import ToggleDarkMode from "./ToggleDarkMode";

export const Header = () => {
  const l10 = useGlobalDyes((state) => state.l10);
  const l8 = useGlobalDyes((state) => state.l8);
  const l5 = useGlobalDyes((state) => state.l5);
  const l6 = useGlobalDyes((state) => state.l6);

  const type = useVariables((state) => state.type);
  const setType = useVariables((state) => state.setType);

  if (l6) {
    console.log(l6);
  }
  return (
    <header className="h-12 w-full border-b" style={{ borderColor: l10 }}>
      <div className="h-full w-11/12 flex items-center justify-between mx-auto">
        <div className="flex space-x-1 items-end">
          <h1 style={{ color: l5 }} className="text-xl font-bold">
            Dye
          </h1>
          <p className="text-sm font-semibold" style={{ color: l8 }}>
            Palette generator
          </p>
        </div>
        <div className="space-x-2 flex items-center">
          <ToggleDarkMode />
          <span className="font-bold text-foreground text-sm">Mode: </span>
          <button
            onClick={() => setType("tw")}
            className="p-2 font-semibold rounded-lg text-sm"
            style={
              type == "tw"
                ? { background: l6, color: getContrastYIQ(l6 && l6) }
                : {}
            }
          >
            Tailwind
          </button>
          <button
            onClick={() => setType("custom")}
            className="p-2 font-semibold rounded-lg text-sm"
            style={
              type == "custom"
                ? { background: l6, color: getContrastYIQ(l6) }
                : {}
            }
          >
            Custom
          </button>
        </div>
      </div>
    </header>
  );
};
