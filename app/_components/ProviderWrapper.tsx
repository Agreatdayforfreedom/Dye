"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

import { useDarkMode } from "@/app/store/dark_mode";
import { createPointersStore, PointersContext } from "@/app/store/pointers";
import {
  createGlobalDyesStore,
  GlobalDyesContext,
} from "@/app/store/global_dyes";
import { d2p } from "@/app/_utils/d2p";
import { MainContent } from "./MainContent";
import { createVariablesStore, VariablesContext } from "@/app/store/variables";
import { order_by_luminance } from "@/app/_utils/order_by_luminance";
import { lerp_colors } from "@/app/_utils/lerp_colors";
import { Attributes, DomainLayout } from "@/app/types";
import chroma from "chroma-js";

interface Props {
  domain: DomainLayout;
  attrs: Attributes;
}

export const ProviderWrapper = ({ domain, attrs }: Props) => {
  const mode = useDarkMode((state) => state.mode);
  console.log("change?");
  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const pointers_store = useRef(
    createPointersStore({
      pointers: d2p(domain, 11),
      stage: attrs.stage,
    })
  ).current;

  //todo lerp stage=shade here to avoid color changes on page load or move to ssr
  const colors = lerp_colors(
    domain,
    attrs.space,
    attrs.hue,
    attrs.brightness,
    attrs.saturation,
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
      ...attrs,
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
