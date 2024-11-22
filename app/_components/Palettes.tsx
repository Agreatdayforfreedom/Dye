import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { default_tw_color_domains } from "@/app/constants";
import { useVariables } from "@/app/store/variables";
import { DomainLayout } from "@/app/types";

import { PreviewPalette } from "./PreviewPalette";
import { SelectLabel } from "@radix-ui/react-select";
import { usePointers, usePointersDomain } from "../store/pointers";

export const Palettes = () => {
  const name = useVariables((state) => state.name);
  const colors = useVariables((state) => state.colors);
  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const domain = usePointersDomain();
  const setName = useVariables((state) => state.setName);

  const asComponentArray = useCallback(() => {
    const palettes: [string, DomainLayout][] = [];

    for (const keyname in default_tw_color_domains) {
      palettes.push([keyname, default_tw_color_domains[keyname]]);
    }

    return palettes;
  }, []);
  return (
    <div>
      <Select
        onValueChange={(v: string) => {
          if (v === "0") return;
          setPointerFromDomain(default_tw_color_domains[v]);
          setName(v.split("_").join(" "));
        }}
      >
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

        <SelectContent className="max-h-[320px]">
          <SelectGroup>
            <SelectLabel>Current (Not saved)</SelectLabel>
            <SelectItem className="p-0" value="0">
              <PreviewPalette key={0} domain={domain} name={name} />
            </SelectItem>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Your palettes</SelectLabel>
            <SelectItem className="p-0" value="0">
              {/*TODO <PreviewPalette key={0} domain={domain} name={name} /> */}
            </SelectItem>
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Explore</SelectLabel>

            {asComponentArray().map(([keyname, domain]) => (
              <SelectItem value={keyname} className="p-0" key={keyname}>
                <PreviewPalette domain={domain} name={keyname} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
