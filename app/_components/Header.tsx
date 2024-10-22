"use client";
import React from "react";
import { useGlobalDyes } from "../store/global_dyes";

export const Header = () => {
  const dye = useGlobalDyes((state) => state.dye1);
  return (
    <div
      className="h-12 w-full border-b border-gray-700"
      style={{ background: dye }}
    ></div>
  );
};
