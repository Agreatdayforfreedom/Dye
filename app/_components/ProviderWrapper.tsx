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
import { default_tw_color_domains } from "../constants";
import { luminance } from "../_utils/luminance";
import { useDomainFromURL } from "../_hooks/useDomainFromURL";
import { order_by_luminance } from "../_utils/order_by_luminance";

export const ProviderWrapper = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "mellow berry";

  const mode = useDarkMode((state) => state.mode);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const domain = useDomainFromURL();

  const pointers_store = useRef(
    createPointersStore({
      pointers: d2p(domain, 11),
    })
  ).current;
  // todo
  const lerp = chroma
    .scale([...domain.hex])
    .domain([...domain.indices])
    .mode("rgb")
    .colors(11);

  const ordered = order_by_luminance(lerp);
  console.log(ordered);

  const global_dyes_store = useRef(
    createGlobalDyesStore({
      l1: ordered[0],
      l2: ordered[1],
      l3: ordered[2],
      l4: ordered[3],
      l5: ordered[4],
      l6: ordered[5],
      l7: ordered[6],
      l8: ordered[7],
      l9: ordered[8],
      l10: ordered[9],
      l11: ordered[10],
    })
  ).current;

  let colorSpace: chroma.InterpolationMode = (searchParams.get("cs") ||
    "rgb") as chroma.InterpolationMode;

  if (colorSpace !== "rgb") {
    colorSpace = "rgb";
  }

  const variables_store = useRef(
    createVariablesStore({
      name,
      brightness: parseInt(searchParams.get("b") || "0", 10) || 0,
      saturation: parseInt(searchParams.get("s") || "0", 10) || 0,
      hue: parseInt(searchParams.get("h") || "0", 10) || 0,
      colorSpace,
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
