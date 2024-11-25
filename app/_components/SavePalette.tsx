import chroma from "chroma-js";
import React, { useState } from "react";

import { usePointersDomain } from "@/app/store/pointers";
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

export const SavePalette = () => {
  const { setDomain, exists } = usePersistentStore();
  const [saved, setSaved] = useState<boolean>(false); // add toast
  const mode = useDarkMode((state) => state.mode);
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  const darken = mode === "dark" ? "darken" : "brighten"; //todo
  const l10 =
    darken === "darken"
      ? useGlobalDyes((state) => state.l2)
      : useGlobalDyes((state) => state.l10);

  if (!exists(name)) {
    return (
      <button
        onClick={() => setDomain(name, domain)}
        className={cn(
          "text-bold text-lg p-2 pb-0",
          saved ? "font-bold text-green-500" : ""
        )}
      >
        {saved ? "Saved" : "Save"}
      </button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "text-bold text-lg p-2 pb-0",
          saved ? "font-bold text-green-500" : ""
        )}
      >
        {saved ? "Saved" : "Save"}
      </AlertDialogTrigger>
      <AlertDialogContent style={{ borderColor: chroma(l10)[darken](2).hex() }}>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Palette <span style={{ color: l10 }}>{name}</span> already saved.
          </AlertDialogTitle>
          <AlertDialogDescription>
            You already have a palette with the name{" "}
            <span className="font-semibold" style={{ color: l10 }}>
              {name}
            </span>{" "}
            saved. Are you sure you want to replace it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{ borderColor: l10 }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            style={{ background: l10 }}
            className="hover:opacity-90 transition-all"
            onClick={() => {
              setDomain(name, domain);
              setSaved(true);
              setTimeout(() => {
                setSaved(false);
              }, 2000);
            }}
          >
            Replace
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
