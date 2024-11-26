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
import { d2p } from "@/app/_utils/d2p";
import { MainContent } from "./MainContent";
import { createVariablesStore, VariablesContext } from "@/app/store/variables";
import { useDomainFromURL } from "@/app/_hooks/useDomainFromURL";
import { order_by_luminance } from "@/app/_utils/order_by_luminance";
import { lerp_colors } from "@/app/_utils/lerp_colors";

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

  const colorSpace: chroma.InterpolationMode = (searchParams.get("cs") ||
    "rgb") as chroma.InterpolationMode;

  const brightness = parseInt(searchParams.get("b") || "0", 10) || 0;
  const saturation = parseInt(searchParams.get("s") || "0", 10) || 0;
  const hue = parseInt(searchParams.get("h") || "0", 10) || 0;

  const colors = lerp_colors(
    domain,
    colorSpace,
    hue,
    brightness,
    saturation,
    11
  );

  const ordered = order_by_luminance(colors.map((c) => c.hex()));

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

  const variables_store = useRef(
    createVariablesStore({
      colors,
      name,
      brightness,
      saturation,
      hue,
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
