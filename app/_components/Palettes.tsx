import React, { useState } from "react";

import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { default_tw_color_domains } from "@/app/constants";
import { useVariables } from "@/app/store/variables";
import { DomainLayout } from "@/app/types";

import { PreviewPalette } from "./PreviewPalette";

export const Palettes = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const name = useVariables((state) => state.name);

  const handleSelected = (v: string[]) => {
    setSelected(v);
  };

  const asComponentArray = () => {
    let palettes: [string, DomainLayout][] = [];

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
