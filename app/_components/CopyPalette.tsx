import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useVariables } from "@/app/store/variables";
import { tw_color_scale } from "@/app/constants";
import { useCopy } from "@/app/_hooks/useCopy";
import { f_oklch, f_rgb } from "@/app/_utils/formatters";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import chroma from "chroma-js";
import { useDarkMode } from "../store/dark_mode";

interface TwPalette {
  [key: string]: string;
}

type CustomPalette = string[];

type CopySpaces = "hex" | "rgb" | "oklch";

export const CopyPalette = () => {
  const [selected, setSelected] = useState<CopySpaces>("rgb");
  const [codeFormatted, setCodeFormatted] = useState<string>("");

  const mode = useDarkMode((state) => state.mode);

  const border_dye = useGlobalDyes((state) => state.l6);
  const name = useVariables((state) => state.name);
  const colors = useVariables((state) => state.colors);
  const type = useVariables((state) => state.type);

  const [isCopied, onCopy] = useCopy();

  const darken = mode === "dark" ? "darken" : "brighten";
  const l2 = useGlobalDyes((state) => state.l2);
  const l10 = useGlobalDyes((state) => state.l10);
  const c1 = darken === "darken" ? l2 : l10;

  useEffect(() => {
    const body: any = {
      colors: {
        [name.toLowerCase().replace(/ /g, "_")]: {},
      },
    };
    const tw_palette: TwPalette = {};
    const custom_palette: CustomPalette = [];

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="border"
          style={{
            "--primary": c1,
            "--secondary": chroma(c1).alpha(0.1).hex(),
          }}
          className="hover:before:border-[var(--primary)] hover:after:border-[var(--primary)] active:bg-[var(--secondary)]"
        >
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-semibold p-2">
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
        <div className="w-full overflow-hidden border rounded pb-2">
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

          <pre className="text-sm  overflow-x-scroll no-scrollbar text-foreground mx-4 font-semibold">
            {codeFormatted}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};
