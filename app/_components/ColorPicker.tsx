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
import { useGlobalDyes } from "../store/global_dyes";
import { tw_color_scale } from "../constants";
import { usePointers } from "../store/pointers";

interface Props {
  color: string;
  index: number;
  label?: string;
}

export const ColorPicker = ({ color, label, index }: Props) => {
  const [colorInput, setColorInput] = useState<string>((() => color)());
  const dye = useGlobalDyes((state) => state.dye3);
  const setPointer = usePointers((state) => state.setPointer);

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

      {/* </PopoverTrigger> */}
      <PopoverContent>
        <div className="fixed top-0 size-full" />

        <HexColorPicker
          color={chroma(color).hex()}
          onChange={(v) => {
            let hex = v;
            if (hex[0] !== "#") {
              hex = "#".concat(hex);
            }
            if (chroma.valid(hex)) {
              setPointer(index, hex);
            }
            setColorInput(hex.slice(1));
          }}
        />
        <div className="relative">
          <HashIcon
            className="absolute stroke-slate-500 top-2.5 left-[5px]"
            size={15}
          />
          <Input
            className="pl-5 pb-[6px]"
            id={"dañls".toLowerCase().replace(/ /g, "_")}
            onChange={(e) => {
              let hex = e.target.value;
              if (hex[0] !== "#") {
                hex = "#".concat(hex);
              }
              if (chroma.valid(hex)) {
                setPointer(index, hex);
              }
              setColorInput(hex.slice(1));
            }}
            value={colorInput}
          />
        </div>
      </PopoverContent>
    </Popover>
  );

  // return (
  //   <div className="flex flex-col">
  //     <Label
  //       htmlFor={label.toLowerCase().replace(/ /g, "_")}
  //       className="font-bold text-gray-700 ml-2"
  //     >
  //       {label}
  //     </Label>
  //     <div className="flex m-1 space-x-2 items-center">
  //       <div className="relative">
  //         <HashIcon
  //           className="absolute stroke-slate-500 top-2.5 left-[5px]"
  //           size={15}
  //         />
  //         <Input
  //           className="pl-5 pb-[6px]"
  //           id={label.toLowerCase().replace(/ /g, "_")}
  //           style={
  //             dye
  //               ? {
  //                   outline: 0,
  //                   boxShadow: `0px 0px 0px 2px ${chroma(dye)
  //                     .alpha(0.4)
  //                     .hex()}`,
  //                   borderColor: dye,
  //                 }
  //               : {}
  //           }
  //           onChange={(e) => {
  //             let hex = e.target.value;
  //             if (hex[0] !== "#") {
  //               hex = "#".concat(hex);
  //             }
  //             if (chroma.valid(hex)) {
  //               setColor(hex);
  //             }
  //             setColorInput(hex.slice(1));
  //           }}
  //           value={colorInput}
  //         />
  //       </div>
  //       <Popover>
  //         <PopoverTrigger
  //           className="size-8 rounded-sm border box-focused"
  //           style={
  //             dye
  //               ? {
  //                   outline: 0,
  //                   boxShadow: `0px 0px 0px 2px ${chroma(dye)
  //                     .alpha(0.4)
  //                     .hex()}`,
  //                   borderColor: dye,
  //                   background: chroma(color).hex(),
  //                 }
  //               : {
  //                   background: chroma(color).hex(),
  //                   borderColor: chroma(color).darken(1).hex(),
  //                 }
  //           }
  //         />
  //         <PopoverContent>
  //           <div className="fixed top-0 size-full" />

  //           <HexColorPicker
  //             color={color}
  //             onChange={(v) => {
  //               let hex = v;
  //               if (hex[0] !== "#") {
  //                 hex = "#".concat(hex);
  //               }
  //               if (chroma.valid(hex)) {
  //                 setColor(hex);
  //               }
  //               setColorInput(hex.slice(1));
  //             }}
  //           />
  //         </PopoverContent>
  //       </Popover>
  //     </div>
  //   </div>
  // );
};
