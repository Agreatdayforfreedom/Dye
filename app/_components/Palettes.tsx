import React, { useCallback } from "react";

import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { default_tw_color_domains } from "@/app/constants";
import { useVariables } from "@/app/store/variables";
import { DomainLayout } from "@/app/types";

import { PreviewPalette } from "./PreviewPalette";

export const Palettes = () => {
  const name = useVariables((state) => state.name);
  const colors = useVariables((state) => state.colors);

  const asComponentArray = useCallback(() => {
    const palettes: [string, DomainLayout][] = [];

    for (const keyname in default_tw_color_domains) {
      palettes.push([keyname, default_tw_color_domains[keyname]]);
    }

    return palettes;
  }, []);
  return (
    <div>
      <Select>
        <SelectTrigger className="space-x-2">
          <span className="capitalize">{name ? name : "Preview palette"}</span>
          {colors.length > 0 && (
            <div className="flex size-6">
              <div>
                <div
                  className="size-3"
                  style={{ background: colors[0].hex() }}
                />
                <div
                  className="size-3"
                  style={{ background: colors[3].hex() }}
                />
              </div>
              <div>
                <div
                  className="size-3"
                  style={{ background: colors[7].hex() }}
                />
                <div
                  className="size-3"
                  style={{ background: colors[10].hex() }}
                />
              </div>
            </div>
          )}
        </SelectTrigger>

        <SelectContent className="overflow-visible">
          {asComponentArray().map(([keyname, domain]) => (
            <PreviewPalette key={keyname} domain={domain} name={keyname} />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
