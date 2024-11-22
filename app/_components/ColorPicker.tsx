"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { HashIcon, Lock, LockOpen } from "lucide-react";
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
}

function onlyNumberHex(hex: string) {
  if (hex[0] === "#") {
    return hex.slice(1);
  }
  return hex;
}

export const ColorPicker = ({ color, index }: Props) => {
  const [colorInput, setColorInput] = useState<string>("");
  const pointers = usePointers((state) => state.pointers);
  const setPointer = usePointers((state) => state.setPointer);
  const undoPointer = usePointers((state) => state.undoPointer);

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
      <div className="size-full">
        <PopoverTrigger
          // prettier-ignore
          className="
          flex items-center justify-center
          size-full
          rounded border transition-colors"
          style={{
            background: chroma(color).hex(),
            borderColor: chroma(color).darken(1).hex(),
          }}
        />

        <span className="text-foreground font-semibold text-sm">
          {tw_color_scale[index]}
        </span>
      </div>

      <PopoverContent className="w-300">
        <div className="w-full flex items-center justify-center pb-1">
          {pointers[index] !== "" ? (
            <button
              onClick={() => undoPointer(index)}
              className="flex items-center text-sm gap-1 p-1 rounded hover:bg-foreground/10"
            >
              <Lock size={18} />
              <span className="font-bold">Locked</span>
            </button>
          ) : (
            <button className="flex items-center text-sm p-1 gap-1">
              <LockOpen size={18} />
              <span className="font-bold">Unlocked</span>
            </button>
          )}
        </div>
        <div className="flex w-full">
          <HexColorPicker
            color={chroma(color).hex()}
            onChange={handleColorPicker}
          />
        </div>
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
