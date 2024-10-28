"use client";

import { HexColorPicker } from "react-colorful";
import { HashIcon } from "lucide-react";
import chroma from "chroma-js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChangeEvent, useEffect, useState } from "react";
import { useGlobalDyes } from "../store/global_dyes";
import { tw_color_scale } from "../constants";
import { usePointers } from "../store/pointers";
import debounce from "../_utils/debounce";

interface Props {
  color: string;
  index: number;
  label?: string;
}

function onlyNumberHex(hex: string) {
  if (hex[0] === "#") {
    return hex.slice(1);
  }
  return hex;
}

export const ColorPicker = ({ color, label, index }: Props) => {
  const [colorInput, setColorInput] = useState<string>(
    () =>
      // onlyNumberHex(color)
      "ffffff"
  );

  const setPointer = usePointers((state) => state.setPointer);

  const handleColorPicker = debounce(
    (v: string | ChangeEvent<HTMLInputElement>) => {
      let hex;
      if (typeof v === "string") {
        hex = v;
      } else {
        hex = v.target.value;
      }
      if (hex[0] !== "#") {
        hex = "#".concat(hex);
      }

      if (chroma.valid(hex)) {
        setPointer(index, hex);
      }
      setColorInput(hex.slice(1));
    },
    300
  );

  return (
    <Popover>
      <div className="w-16">
        <PopoverTrigger
          className="h-12 w-16 rounded border"
          style={{
            background: chroma(color).hex(),
            borderColor: chroma(color).darken(1).hex(),
          }}
        />
        <span className="text-slate-700 font-semibold text-sm">
          {tw_color_scale[index]}
        </span>
      </div>

      <PopoverContent>
        <HexColorPicker
          color={chroma(color).hex()}
          onChange={handleColorPicker}
        />
        <div className="relative mt-1">
          <HashIcon
            className="absolute stroke-slate-500 top-2.5 left-[5px]"
            size={15}
          />
          <Input
            className="pl-5 pb-[6px]"
            onChange={handleColorPicker}
            value={colorInput}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
