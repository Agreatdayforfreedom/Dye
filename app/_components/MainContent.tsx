import React from "react";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";
import { InputBrightness } from "./InputBrightness";
import { Header } from "./Header";
import PreviewSection from "./preview_components/PreviewSection";

import { useGlobalDyes } from "@/app/store/global_dyes";
import { Separator } from "@/components/ui/separator";
import { ShadingSwitch } from "./ShadingSwitch";
import { SavePalette } from "./SavePalette";
import { CopyPalette } from "./CopyPalette";
import { Palettes } from "./Palettes";

export const MainContent = () => {
  const border_dye = useGlobalDyes((state) => state.l6);

  return (
    <>
      <Header />

      <main className="space-y-4">
        <section>
          <div className="flex py-8 justify-end mx-auto">
            <div className="flex flex-col w-full gap-2 md:w-3/4 md:mx-auto">
              <div className="flex justify-between sm:justify-normal">
                <InputName />
                <ShadingSwitch />
              </div>
              <div className="flex flex-col gap-2 xs:flex-row">
                <div className="flex w-full">
                  <InputSaturation />
                  <InputBrightness />
                </div>
                <div className="flex w-full">
                  <InputHue />
                  <SpaceSelector />
                </div>
              </div>
            </div>
          </div>
          <ColorContainer />
          <div className="flex justify-between w-[90%] sm:3/4 mx-auto items-center mt-14">
            <Palettes />
            <div className="flex items-end">
              <SavePalette />
              <CopyPalette />
            </div>
          </div>
        </section>
        <Separator
          style={{ background: border_dye }}
          className="w-11/12 mx-auto"
          decorative={true}
        />
        <PreviewSection />
      </main>
    </>
  );
};
