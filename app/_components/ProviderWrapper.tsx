"use client";
import chroma from "chroma-js";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useDarkMode } from "@/app/store/dark_mode";
import { createPointersStore, PointersContext } from "@/app/store/pointers";
import {
  createGlobalDyesStore,
  GlobalDyesContext,
} from "@/app/store/global_dyes";
import { DomainLayout } from "@/app/types";
import { d2p } from "@/app/_utils/d2p";

import { MainContent } from "./MainContent";
import { createVariablesStore, VariablesContext } from "../store/variables";

export const ProviderWrapper = () => {
  const mode = useDarkMode((state) => state.mode);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const searchParams = useSearchParams();
  const domain: DomainLayout = {
    hex: JSON.parse(searchParams.get("p") || "[]"),
    indices: JSON.parse(searchParams.get("i") || "[]"),
  };

  const pointers_store = useRef(
    createPointersStore({
      pointers: d2p(domain, 11),
    })
  ).current;

  let lerp = chroma
    .scale([...domain.hex])
    .domain([...domain.indices])
    .mode("rgb")
    .colors(11); // todo
  const global_dyes_store = useRef(
    createGlobalDyesStore({
      border_dye: lerp[1],
      text_dye: lerp[3],
      border_shadow_dye: lerp[5],
      title_dye: lerp[7],
      bg_dye: lerp[9],
    })
  ).current;

  const variables_store = useRef(
    createVariablesStore({
      name: searchParams.get("name") || "",
      brightness: parseInt(searchParams.get("b") || "0", 10),
      saturation: parseInt(searchParams.get("s") || "0", 10),
      hue: parseInt(searchParams.get("h") || "0", 10),
      colorSpace: (searchParams.get("cs") || "rgb") as chroma.InterpolationMode,
    })
  ).current;
  return (
    <VariablesContext.Provider value={variables_store}>
      <PointersContext.Provider value={pointers_store}>
        <GlobalDyesContext.Provider value={global_dyes_store}>
          <MainContent />
        </GlobalDyesContext.Provider>
      </PointersContext.Provider>
    </VariablesContext.Provider>
  );
};
