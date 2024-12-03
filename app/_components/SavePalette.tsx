import chroma from "chroma-js";
import React from "react";

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
import { useToast } from "@/hooks/use-toast";
import { ChangesAccordion } from "./ChangesAccordion";

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
  if (
    is_equal(name, {
      brightness,
      hex: domain.hex,
      hue,
      indices: domain.indices,
      saturation,
      space: colorSpace,
      stage,
    })
  ) {
    return (
      <button disabled className="text-bold text-lg p-2 pb-0">
        Save
      </button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-bold text-lg p-2 pb-0">
        Save
      </AlertDialogTrigger>

      <AlertDialogContent style={{ borderColor: chroma(c1)[darken](2).hex() }}>
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
    </AlertDialog>
  );
};
