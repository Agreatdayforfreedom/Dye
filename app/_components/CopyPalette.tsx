import chroma from "chroma-js";
import { CheckIcon, CopyCheck, CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { useVariables } from "../store/variables";
import { tw_color_scale } from "../constants";
import { useCopy } from "../_hooks/useCopy";
import { f_oklch, f_rgb } from "../_utils/formatters";

interface Props {
  colors: chroma.Color[];
}

interface Palette {
  [key: string]: string;
}

type CopySpaces = "hex" | "rgb" | "oklch";

export const CopyPalette = ({ colors }: Props) => {
  const [selected, setSelected] = useState<CopySpaces>("rgb");

  const name = useVariables((state) => state.name);
  const [isCopied, onCopy] = useCopy();
  console.log(colors);
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
    <div className="w-96 bg-slate-200 rounded bg-au">
      <div className="p-4 flex justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelected("hex")}
            style={selected === "hex" ? { background: "#cccccc" } : {}}
            className="border px-2 font-semibold"
          >
            hex
          </button>
          <button
            onClick={() => setSelected("rgb")}
            style={selected === "rgb" ? { background: "#cccccc" } : {}}
            className="border px-2 font-semibold"
          >
            rgb
          </button>
          <button
            onClick={() => setSelected("oklch")}
            style={selected === "oklch" ? { background: "#cccccc" } : {}}
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
  );
};
