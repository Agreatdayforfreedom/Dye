import chroma from "chroma-js";
import React, { useEffect, useState } from "react";

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
import { Button } from "../../components/ui/button";

export const SavePalette = () => {
  const { setDomain, exists, is_equal } = usePersistentStore();

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const mode = useDarkMode((state) => state.mode);
  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  const stage = usePointers((state) => state.stage);

  const brightness = useVariables((state) => state.brightness);
  const hue = useVariables((state) => state.hue);
  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);

  const darken = mode === "dark" ? "darken" : "brighten";
  const l2 = useGlobalDyes((state) => state.l2);
  const l10 = useGlobalDyes((state) => state.l10);
  const c1 = darken === "darken" ? l2 : l10;

  function onClick(dialog: boolean = false) {
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
      return;
    }
    if (!exists(name) && !open) {
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
            You now have <span style={{ color: c1 }}>{name}</span> in your kit!
          </>
        ),
      });
    } else {
      setOpen(true);
      if (dialog) {
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
        setOpen(false);
      }
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => onClick()}
          variant="border"
          style={{
            "--primary": c1,
            "--secondary": chroma(c1).alpha(0.1).hex(),
          }}
          className="hover:before:border-[var(--primary)] hover:after:border-[var(--primary)] active:bg-[var(--secondary)]"
        >
          Save
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent style={{ borderColor: chroma(c1)[darken](2).hex() }}>
        <AlertDialogHeader className="text-left">
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
        <AlertDialogFooter className="flex flex-col items-center w-full sm:flex sm:items-end">
          <ChangesAccordion />
          <div className="flex mt-4 flex-col-reverse w-full sm:flex sm:flex-row sm:w-auto sm:space-x-2 sm:justify-end">
            <AlertDialogCancel
              style={{ borderColor: c1 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              style={{ background: c1 }}
              className="hover:opacity-90 transition-all"
              onClick={() => onClick(true)}
            >
              Save
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
