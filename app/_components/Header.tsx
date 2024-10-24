"use client";
import React from "react";
import { useGlobalDyes } from "../store/global_dyes";

export const Header = () => {
  const title_dye = useGlobalDyes((state) => state.title_dye);
  const border_dye = useGlobalDyes((state) => state.border_dye);
  const text_dye = useGlobalDyes((state) => state.text_dye);
  return (
    <header
      className="h-12 w-full border-b"
      style={{ borderColor: border_dye }}
    >
      <div className="h-full w-11/12 flex items-center mx-auto">
        <div className="flex space-x-1 items-end">
          <h1 style={{ color: title_dye }} className="text-xl font-bold">
            Dye
          </h1>
          <p className="text-sm font-semibold" style={{ color: text_dye }}>
            Palette generator
          </p>
        </div>
      </div>
    </header>
  );
};
