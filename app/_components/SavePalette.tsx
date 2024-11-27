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
import { useToast } from "@/hooks/use-toast";

export const SavePalette = () => {
  const { setDomain, exists } = usePersistentStore();

  const { toast } = useToast();
  const mode = useDarkMode((state) => state.mode);
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();

  const darken = mode === "dark" ? "darken" : "brighten"; //todo
  const l2 = useGlobalDyes((state) => state.l2);
  const l10 = useGlobalDyes((state) => state.l10);
  const c1 = darken === "darken" ? l2 : l10;

  if (!exists(name)) {
    return (
      <button
        onClick={() => {
          setDomain(name, domain);
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
      <AlertDialogContent style={{ borderColor: chroma(c1)[darken](2).hex() }}>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            <span style={{ color: c1 }}>{name}</span> palette already saved.
          </AlertDialogTitle>
          <AlertDialogDescription>
            You already have a palette with the name{" "}
            <span className="font-semibold" style={{ color: c1 }}>
              {name}
            </span>{" "}
            saved. Are you sure you want to replace it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{ borderColor: c1 }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            style={{ background: c1 }}
            className="hover:opacity-90 transition-all"
            onClick={() => {
              setDomain(name, domain);
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
            Replace
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
