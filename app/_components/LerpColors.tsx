"use client";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";
import { InputBrightness } from "./InputBrightness";
import { useEffect } from "react";
import { useDarkMode } from "../store/dark_mode";

export const LerpColors = () => {
  const mode = useDarkMode((state) => state.mode);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);
  return (
    <>
      <section className="flex h-1/3 py-8 justify-end mx-auto">
        <div className=" lg:w-3/4 mx-auto">
          <div className="flex space-x-2">
            <InputName />
          </div>
          <div className="flex items-end space-x-2 mt-2">
            <InputSaturation />
            <InputBrightness />
            <InputHue />
            <SpaceSelector />
          </div>
        </div>
      </section>
      <ColorContainer />
    </>
  );
};
