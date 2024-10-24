import chroma from "chroma-js";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";

import { useVariables } from "@/app/store/variables";
import { tw_color_scale } from "@/app/constants";
import { useCopy } from "@/app/_hooks/useCopy";
import { f_oklch, f_rgb } from "@/app/_utils/formatters";
import { useGlobalDyes } from "../store/global_dyes";

interface Props {
  colors: chroma.Color[];
}

interface Palette {
  [key: string]: string;
}

type CopySpaces = "hex" | "rgb" | "oklch";

export const CopyPalette = ({ colors }: Props) => {
  const [selected, setSelected] = useState<CopySpaces>("rgb");
  const border_dye = useGlobalDyes((state) => state.border_dye);
  const name = useVariables((state) => state.name);
  const [isCopied, onCopy] = useCopy();
  const body = {
    colors: {
      [name.toLowerCase()]: {},
    },
  };
  const palette: Palette = {};

  let i = 0;

  while (i < tw_color_scale.length) {
    if (selected === "hex") palette[tw_color_scale[i]] = colors[i][selected]();
    if (selected === "rgb")
      palette[tw_color_scale[i]] = f_rgb(colors[i][selected]());
    if (selected === "oklch")
      palette[tw_color_scale[i]] = f_oklch(colors[i][selected]());

    i++;
  }
  body.colors[name.toLowerCase()] = palette;
  function handlePalette() {
    onCopy(JSON.stringify(body, null, 2));
  }

  return (
    <div>
      <h2 className=" text-slate-700 text-semibold p-2">
        Paste this code into your <b>tailwind.config.ts</b> file
      </h2>
      <div className="w-96 bg-slate-50 border rounded pb-2">
        <div className="p-4 flex justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelected("hex")}
              style={selected === "hex" ? { borderColor: border_dye } : {}}
              className="border px-2 font-semibold"
            >
              hex
            </button>
            <button
              onClick={() => setSelected("rgb")}
              style={selected === "rgb" ? { borderColor: border_dye } : {}}
              className="border px-2 font-semibold"
            >
              rgb
            </button>
            <button
              onClick={() => setSelected("oklch")}
              style={selected === "oklch" ? { borderColor: border_dye } : {}}
              className="border px-2 font-semibold"
            >
              oklch
            </button>
          </div>
          <button onClick={handlePalette}>
            {isCopied ? (
              <CheckIcon size={20} stroke="green" />
            ) : (
              <CopyIcon size={20} />
            )}
          </button>
        </div>

        <pre className="text-sm text-gray-700 mx-4 font-semibold">
          {JSON.stringify(body, null, 2)}
        </pre>
      </div>
    </div>
  );
};
