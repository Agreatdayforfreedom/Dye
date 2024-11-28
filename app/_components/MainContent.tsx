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

export const MainContent = () => {
  const border_dye = useGlobalDyes((state) => state.l6);

  return (
    <>
      <Header />

      <main className="space-y-4">
        <section>
          <div className="flex  py-8 justify-end mx-auto">
            <div className="w-full md:w-3/4 mx-auto">
              <div className="flex space-x-10">
                <InputName />
                <ShadingSwitch />
              </div>
              <div className="flex flex-col xs:flex-row xs:items-end mt-2">
                <InputSaturation />
                <InputBrightness />
                <InputHue />
                <SpaceSelector />
              </div>
            </div>
          </div>
          <ColorContainer />
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
