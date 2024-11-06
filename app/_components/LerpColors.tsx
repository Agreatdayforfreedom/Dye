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
import { DomainLayout } from "@/app/types";
import { d2p } from "@/app/_utils/d2p";

export const LerpColors = () => {
  const mode = useDarkMode((state) => state.mode);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const searchParams = useSearchParams();
  let domain: DomainLayout = {
    hex: JSON.parse(searchParams.get("p") || "[]"),
    indices: JSON.parse(searchParams.get("i") || "[]"),
  };

  const store = useRef(
    createPointersStore({
      pointers: d2p(domain, 11),
    })
  ).current;

  return (
    <PointersContext.Provider value={store}>
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
    </PointersContext.Provider>
  );
};
