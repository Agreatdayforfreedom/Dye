"use client";
import React from "react";
import { useGlobalDyes } from "../store/global_dyes";

export const Header = () => {
  const dye1 = useGlobalDyes((state) => state.dye1);
  const dye5 = useGlobalDyes((state) => state.dye5);
  return (
    <header className="h-12 w-full border-b" style={{ borderColor: dye5 }}>
      <div className="h-full w-11/12 flex items-center mx-auto">
        <div className="flex space-x-1 items-end">
          <h1 style={{ color: dye1 }} className="text-xl font-bold">
            Dye
          </h1>
          <p className="text-sm font-semibold" style={{ color: dye1 }}>
            Palette generator
          </p>
        </div>
      </div>
    </header>
  );
};
