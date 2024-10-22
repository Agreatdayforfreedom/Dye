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

import { useState } from "react";

interface Props {
  color: string;
  setColor: (color: string) => void;
  label: string;
}

export const ColorPicker = ({ color, setColor, label }: Props) => {
  const [colorInput, setColorInput] = useState<string>((() => color)());
  return (
    <div className="flex flex-col">
      <Label
        htmlFor={label.toLowerCase().replace(/ /g, "_")}
        className="font-bold text-gray-700 ml-2"
      >
        {label}
      </Label>
      <div className="flex m-1 space-x-2 items-center">
        <div className="relative">
          <HashIcon
            className="absolute stroke-slate-500 top-2.5 left-[5px]"
            size={15}
          />
          <Input
            className="pl-5 pb-[6px]"
            id={label.toLowerCase().replace(/ /g, "_")}
            onChange={(e) => {
              let hex = e.target.value;
              if (hex[0] !== "#") {
                hex = "#".concat(hex);
              }
              if (chroma.valid(hex)) {
                setColor(hex);
              }
              setColorInput(hex.slice(1));
            }}
            value={colorInput}
          />
        </div>
        <Popover>
          <PopoverTrigger
            className="size-8 rounded-sm border box-focused"
            style={{
              background: chroma(color).hex(),
              borderColor: chroma(color).darken(1).hex(),
            }}
          />
          <PopoverContent>
            <div className="fixed top-0 size-full" />

            <HexColorPicker
              color={color}
              onChange={(v) => {
                let hex = v;
                if (hex[0] !== "#") {
                  hex = "#".concat(hex);
                }
                if (chroma.valid(hex)) {
                  setColor(hex);
                }
                setColorInput(hex.slice(1));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
