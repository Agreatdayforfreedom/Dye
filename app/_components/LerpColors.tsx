"use client";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";
import { InputBrightness } from "./InputBrightness";

export const LerpColors = () => {
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
