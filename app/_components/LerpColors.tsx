"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";
import { InputBrightness } from "./InputBrightness";

import { useDarkMode } from "@/app/store/dark_mode";
import { createPointersStore, PointersContext } from "@/app/store/pointers";
import {
  createGlobalDyesStore,
  GlobalDyesContext,
} from "@/app/store/global_dyes";
import { DomainLayout } from "@/app/types";
import { d2p } from "@/app/_utils/d2p";
import { Header } from "./Header";

export const LerpColors = () => {
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

  const global_dyes_store = useRef(
    createGlobalDyesStore({
      bg_dye: "red",
      border_dye: "blue",
      border_shadow_dye: "cyan",
      text_dye: "yellow",
      title_dye: "orange",
    })
  ).current;

  return (
    <PointersContext.Provider value={pointers_store}>
      <GlobalDyesContext.Provider value={global_dyes_store}>
        <Header />

        <section className="flex  py-8 justify-end mx-auto">
          <div className="w-full md:w-3/4 mx-auto">
            <div className="flex space-x-2">
              <InputName />
            </div>
            <div className="flex flex-col xs:flex-row xs:items-end mt-2">
              <InputSaturation />
              <InputBrightness />
              <InputHue />
              <SpaceSelector />
            </div>
          </div>
        </section>
        <ColorContainer />
      </GlobalDyesContext.Provider>
    </PointersContext.Provider>
  );
};
