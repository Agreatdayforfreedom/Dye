"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { HashIcon } from "lucide-react";
import chroma from "chroma-js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { tw_color_scale } from "@/app/constants";
import { usePointers } from "@/app/store/pointers";
import debounce from "@/app/_utils/debounce";

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
  const [colorInput, setColorInput] = useState<string>("");

  const setPointer = usePointers((state) => state.setPointer);

  useEffect(() => {
    setColorInput(onlyNumberHex(color));
  }, [color]);

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
          className="h-12 w-16 rounded border transition-colors"
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
            onChange={(e) => {
              if (chroma.valid(e.target.value)) {
                setPointer(index, e.target.value);
              }
              setColorInput(onlyNumberHex(e.target.value));
            }}
            value={colorInput}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
