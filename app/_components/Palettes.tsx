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

  const setBrightness = useVariables((state) => state.setBrightness);
  const setHue = useVariables((state) => state.setHue);
  const setSaturation = useVariables((state) => state.setSaturation);
  const setColorSpace = useVariables((state) => state.setColorSpace);
  const hue = useVariables((state) => state.hue);
  const saturation = useVariables((state) => state.saturation);
  const brightness = useVariables((state) => state.brightness);
  const colorSpace = useVariables((state) => state.colorSpace);

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
            console.log({ domain });
            if (domain) {
              setPointerFromDomain({
                hex: domain.hex,
                indices: domain.indices,
              });
              setBrightness(domain.brightness);
              setHue(domain.hue);
              setSaturation(domain.saturation);
              setColorSpace(domain.space);
              setName(v.split(SELECT_KEY)[1]);
            }
            return;
          }
          setPointerFromDomain(default_tw_color_domains[v]);
          setBrightness(0);
          setHue(0);
          setSaturation(0);
          setColorSpace("rgb");
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
              <PreviewPalette
                key={0}
                domain={domain}
                attrs={{
                  brightness,
                  hue,
                  saturation,
                  space: colorSpace,
                }}
                name={name}
              />
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
                    <PreviewPalette
                      domain={{
                        hex: domains[key].hex,
                        indices: domains[key].indices,
                      }}
                      attrs={{
                        brightness: domains[key].brightness,
                        hue: domains[key].hue,
                        saturation: domains[key].saturation,
                        space: domains[key].space,
                      }}
                      name={name}
                    />
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
