"use client";

import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ColorContainer } from "./ColorContainer";
import { SpaceSelector } from "./SpaceSelector";
import { useGlobalDyes } from "../store/global_dyes";
import { usePointersDomain } from "../store/pointers";
import { InputName } from "./InputName";
import { InputSaturation } from "./InputSaturation";
import { InputHue } from "./InputHue";

export const LerpColors = () => {
  return (
    <>
      <div className="flex w-11/12 h-1/3 py-8 justify-end mx-auto">
        <div className="flex items-end space-x-2">
          <InputName />
          <InputSaturation />
          <InputHue />
          <SpaceSelector />
        </div>
      </div>
      <ColorContainer />
    </>
  );
};
