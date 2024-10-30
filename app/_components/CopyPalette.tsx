import chroma from "chroma-js";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useVariables } from "@/app/store/variables";
import { tw_color_scale } from "@/app/constants";
import { useCopy } from "@/app/_hooks/useCopy";
import { f_oklch, f_rgb } from "@/app/_utils/formatters";
import { useGlobalDyes } from "@/app/store/global_dyes";

interface Props {
  colors: chroma.Color[];
}

interface TwPalette {
  [key: string]: string;
}

type CustomPalette = string[];

type CopySpaces = "hex" | "rgb" | "oklch";

export const CopyPalette = () => {
  const [selected, setSelected] = useState<CopySpaces>("rgb");
  const [codeFormatted, setCodeFormatted] = useState<string>("");

  const border_dye = useGlobalDyes((state) => state.border_dye);
  const name = useVariables((state) => state.name);
  const colors = useVariables((state) => state.colors);
  const type = useVariables((state) => state.type);

  const [isCopied, onCopy] = useCopy();

  useEffect(() => {
    let body: any = {
      colors: {
        [name.toLowerCase().replace(/ /g, "_")]: {},
      },
    };
    let tw_palette: TwPalette = {};
    let custom_palette: CustomPalette = [];

    let i = 0;

    if (colors.length > 0) {
      while (i < colors.length) {
        if (colors[i]) {
          if (type === "tw") {
            if (selected === "hex")
              tw_palette[tw_color_scale[i]] = colors[i][selected]();
            if (selected === "rgb")
              tw_palette[tw_color_scale[i]] = f_rgb(colors[i][selected]());
            if (selected === "oklch")
              tw_palette[tw_color_scale[i]] = f_oklch(colors[i][selected]());
          } else {
            if (selected === "hex") custom_palette.push(colors[i][selected]());
            if (selected === "rgb")
              custom_palette.push(f_rgb(colors[i][selected]()));
            if (selected === "oklch")
              custom_palette.push(f_oklch(colors[i][selected]()));
          }
        }
        i++;
      }
    }
    if (type == "tw") {
      body.colors[name.toLowerCase().replace(/ /g, "_")] = tw_palette;
    } else {
      // override body to avoid tailwind format
      delete body.colors;
      body[name.toLowerCase().replace(/ /g, "_")] = custom_palette;
    }

    setCodeFormatted(JSON.stringify(body, null, 2));
  }, [colors, selected]);

  function handlePalette() {
    onCopy(codeFormatted);
  }

  return (
    <div>
      <h2 className=" text-slate-700 text-semibold p-2">
        {type == "tw" ? (
          <>
            Paste this code into your <b>tailwind.config.ts</b> file.
          </>
        ) : (
          <>
            <b className="capitalize">{selected}</b> css formatted colors.
          </>
        )}
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

        <pre className="text-sm text-foreground mx-4 font-semibold">
          {codeFormatted}
        </pre>
      </div>
    </div>
  );
};
