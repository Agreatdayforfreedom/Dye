import React, { useEffect, useState } from "react";

import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { default_tw_color_domains } from "@/app/constants";
import { useVariables } from "@/app/store/variables";
import { DomainLayout } from "@/app/types";

import { PreviewPalette } from "./PreviewPalette";
import chroma from "chroma-js";
import { useSearchParams } from "next/navigation";
import { usePointers } from "../store/pointers";

export const Palettes = () => {
  const name = useVariables((state) => state.name);
  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const [selected, setSelected] = useState<string[]>(() => {
    const domain = default_tw_color_domains[name.split(" ").join("_")];
    if (domain?.hex.length > 0) {
      return chroma
        .scale([...domain.hex])
        .mode("rgb")
        .domain([...domain.indices])
        .colors(11);
    } else return [];
  });
  const handleSelected = (v: string[]) => {
    setSelected(v);
  };

  const asComponentArray = () => {
    const palettes: [string, DomainLayout][] = [];

    for (const keyname in default_tw_color_domains) {
      palettes.push([keyname, default_tw_color_domains[keyname]]);
    }

    return palettes;
  };
  return (
    <div>
      <Select>
        <SelectTrigger className="space-x-2">
          {selected.length <= 0 ? (
            <span>Preview Palette</span>
          ) : (
            <>
              <span className="capitalize">{name}</span>
              <div className="flex size-6">
                <div>
                  <div className="size-3" style={{ background: selected[0] }} />
                  <div className="size-3" style={{ background: selected[3] }} />
                </div>
                <div>
                  <div className="size-3" style={{ background: selected[7] }} />
                  <div
                    className="size-3"
                    style={{ background: selected[10] }}
                  />
                </div>
              </div>
            </>
          )}
        </SelectTrigger>

        <SelectContent className="overflow-visible">
          {asComponentArray().map(([keyname, domain]) => (
            <PreviewPalette
              key={keyname}
              domain={domain}
              name={keyname}
              setSelected={handleSelected}
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
