import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
} from "@/components/ui/select";
import { default_tw_color_domains } from "@/app/constants";
import { useVariables } from "@/app/store/variables";
import { DomainLayout } from "@/app/types";
import { PreviewPalette } from "./PreviewPalette";
import { usePointers, usePointersDomain } from "@/app/store/pointers";
import { usePersistentStore } from "@/app/store/persistent_domain";

const SELECT_KEY: string = "__$ls";

export const Palettes = () => {
  const name = useVariables((state) => state.name);
  const colors = useVariables((state) => state.colors);
  const setName = useVariables((state) => state.setName);

  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );

  const { domains, exists } = usePersistentStore();
  const domain = usePointersDomain();

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
          if (v.includes(SELECT_KEY) && domains) {
            const domain = domains[v.split(SELECT_KEY)[1]];
            if (domain) {
              setPointerFromDomain(domain);
              setName(v.split(SELECT_KEY)[1]);
            }
            return;
          }
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
            <SelectLabel>
              Current {exists(name) ? "(Saved)" : "(Not saved)"}
            </SelectLabel>
            <SelectItem className="p-0" value="0">
              <PreviewPalette key={0} domain={domain} name={name} />
            </SelectItem>
          </SelectGroup>

          <SelectGroup className="border-t mt-2">
            <SelectLabel>Your palettes</SelectLabel>
            {Object.keys(domains).length > 0 ? (
              Object.keys(domains).map((key) => {
                return (
                  <SelectItem
                    className="p-0"
                    key={SELECT_KEY + key}
                    value={SELECT_KEY + key}
                  >
                    <PreviewPalette domain={domains[key]} name={name} />
                  </SelectItem>
                );
              })
            ) : (
              <span className="block font-semibold text-sm w-[90%] mx-auto">
                You don&apos;t have any palettes saved yet.
              </span>
            )}
          </SelectGroup>

          <SelectGroup className="border-t mt-2">
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
