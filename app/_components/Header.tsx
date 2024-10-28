"use client";

import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { useVariables } from "@/app/store/variables";
import { getContrastYIQ } from "../_utils/yiq";

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
        <div className="space-x-2">
          <span className="font-bold text-gray-700 text-sm">Mode: </span>
          <button
            onClick={() => setType("tw")}
            className="p-2 font-semibold rounded-lg text-sm"
            style={
              type == "tw"
                ? { background: bg_dye, color: getContrastYIQ(bg_dye) }
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
                ? { background: bg_dye, color: getContrastYIQ(bg_dye) }
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
