import React from "react";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";
import { InputBrightness } from "./InputBrightness";
import { Header } from "./Header";

export const MainContent = () => {
  return (
    <>
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
    </>
  );
};
