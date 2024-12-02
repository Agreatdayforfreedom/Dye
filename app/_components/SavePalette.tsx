import chroma from "chroma-js";
import React, { useState } from "react";

import { usePointers, usePointersDomain } from "@/app/store/pointers";
import { useVariables } from "@/app/store/variables";
import { usePersistentStore } from "@/app/store/persistent_domain";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { useDarkMode } from "@/app/store/dark_mode";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Attributes } from "../types";
import { tw_color_scale } from "../constants";

export const SavePalette = () => {
  const { setDomain, exists, is_equal } = usePersistentStore();

  const { toast } = useToast();
  const mode = useDarkMode((state) => state.mode);
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  const stage = usePointers((state) => state.stage);

  const brightness = useVariables((state) => state.brightness);
  const hue = useVariables((state) => state.hue);
  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);

  const darken = mode === "dark" ? "darken" : "brighten"; //todo
  const l2 = useGlobalDyes((state) => state.l2);
  const l10 = useGlobalDyes((state) => state.l10);
  const c1 = darken === "darken" ? l2 : l10;

  if (!exists(name)) {
    return (
      <button
        onClick={() => {
          setDomain(name, domain, {
            brightness,
            hue,
            saturation,
            space: colorSpace,
            stage,
          });
          toast({
            title: "Palette saved!",
            description: (
              <>
                You now have <span style={{ color: c1 }}>{name}</span> in your
                kit!
              </>
            ),
          });
        }}
        className="text-bold text-lg p-2 pb-0"
      >
        Save
      </button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-bold text-lg p-2 pb-0">
        Save
      </AlertDialogTrigger>
      {is_equal(name, {
        //TODO: this is buggy
        brightness,
        hex: domain.hex,
        hue,
        indices: domain.indices,
        saturation,
        space: colorSpace,
        stage,
      }) ? null : (
        <AlertDialogContent
          style={{ borderColor: chroma(c1)[darken](2).hex() }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-medium">
              <span style={{ color: c1 }}>{name}</span> has unsaved changes.
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have changes in your palette{" "}
              <span className="font-semibold" style={{ color: c1 }}>
                {name}.
              </span>
              <br />
              Are you sure you want to replace it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <ChangesAccordion />
            <AlertDialogCancel style={{ borderColor: c1 }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              style={{ background: c1 }}
              className="hover:opacity-90 transition-all"
              onClick={() => {
                setDomain(name, domain, {
                  brightness,
                  hue,
                  saturation,
                  space: colorSpace,
                  stage,
                });
                toast({
                  title: "Palette updated!",
                  description: (
                    <>
                      <span style={{ color: c1 }}>{name}</span> was updated
                    </>
                  ),
                });
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

type Changes = {
  [key in keyof Attributes]: { saved: string; modified: string };
};

const ChangesAccordion = () => {
  const { domains } = usePersistentStore();

  const mode = useDarkMode((state) => state.mode);
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  const stage = usePointers((state) => state.stage);

  const brightness = useVariables((state) => state.brightness);
  const hue = useVariables((state) => state.hue);
  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);
  let saved = domains[name];
  const x: Changes = {
    hue: {
      modified: hue.toString(),
      saved: saved.hue.toString(),
    },
    brightness: {
      modified: brightness.toString(),
      saved: saved.brightness.toString(),
    },

    saturation: {
      modified: saturation.toString(),
      saved: saved.saturation.toString(),
    },

    space: {
      modified: colorSpace.toString(),
      saved: saved.space.toString(),
    },

    stage: {
      modified: stage.toString(),
      saved: saved.stage.toString(),
    },
  };
  let hex_changes: { [key: string]: string } = {};

  let i = stage === "shade" ? 1 : 0;
  let n = stage === "shade" ? domain.hex.length - 1 : domain.hex.length;
  while (i < n) {
    let plus = "+";
    let minus = "-";
    let pkey = `${plus}${tw_color_scale[domain.indices[i]]}`;
    let mkey = `${minus}${tw_color_scale[domain.indices[i]]}`;
    const modified = domain.hex[i];
    const saved = domains[name].hex[i];
    if (modified !== saved) {
      hex_changes[pkey] = modified;
      hex_changes[mkey] = saved;
    }
    i++;
  }

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="??" className="border-none mt-2">
        <AccordionTrigger className="p-0 font-bold" decoration={false}>
          See your changes
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            {Object.keys(x).map((k: string) => {
              let asd = x[k as keyof Attributes];
              return (
                <span>
                  {asd.saved !== asd.modified && (
                    <>
                      {k}:{" "}
                      <span className="font-bold text-red-600">
                        {asd.saved}
                      </span>
                      <span className="font-bold text-xs mx-1 tracking-tighter">
                        ..
                      </span>
                      <span className="font-bold text-green-600">
                        {asd.modified}
                      </span>
                    </>
                  )}
                </span>
              );
            })}
            {/* FIXME: refactor the whole file */}
            <span className="flex flex-col">
              colors: [
              <span className="flex flex-col mx-4">
                {Object.keys(hex_changes).map((hex: string, i: number) => {
                  if (hex_changes[hex] === undefined) return null;
                  return (
                    <span>
                      <span
                        className={cn(
                          "font-bold",
                          hex[0] === "-" ? "text-red-500" : "text-green-500"
                        )}
                      >
                        {" "}
                        {hex[0]}
                      </span>{" "}
                      {hex.slice(1)}: {hex_changes[hex]},
                    </span>
                  );
                })}
              </span>
              ]
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
