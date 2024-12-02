import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

import { DomainLayout, PointerStage } from "@/app/types";
import { d2p } from "@/app/_utils/d2p";
import chroma from "chroma-js";

const TW_STEPS: number = 11;

interface PointersProps {
  pointers: Array<string>;
  stage: PointerStage;
}

interface PointersState extends PointersProps {
  setPointer: (index: number, color: string) => void;
  setPointerFromDomain: (domain: DomainLayout) => void;
  undoPointer: (index: number) => void;
  setStage: (stage?: PointerStage) => void;
}

type PointerStore = ReturnType<typeof createPointersStore>;

export const PointersContext = createContext<PointerStore | null>(null);

export const createPointersStore = (initProps?: Partial<PointersProps>) => {
  const DEFAULT_PROPS: PointersProps = {
    stage: "free",
    pointers: ["", "", "", "", "", "", "", "", "", "", ""],
  };
  return createStore<PointersState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setPointer: (index: number, color: string) =>
      set((state) => ({
        pointers:
          state.stage === "free"
            ? state.pointers.map((p: string, i: number) =>
                i === index ? color : p
              )
            : state.pointers.map((p: string, i: number) =>
                i === 5 ? color : ""
              ),
      })),
    setPointerFromDomain: (domain: DomainLayout) =>
      set(() => ({
        pointers: d2p(domain, TW_STEPS),
      })),
    undoPointer: (index: number) => {
      set((state) => ({
        pointers: state.pointers.map((p: string, i: number) =>
          state.stage === "free" ? (i === index ? "" : p) : p
        ),
      }));
    },
    setStage: (stage?: PointerStage) =>
      set((state) => {
        let det_stage = stage
          ? stage
          : state.stage === "free"
          ? "shade"
          : "free";

        const available_pointers = state.pointers.filter((x) => x !== "");
        let merged = "";

        if (available_pointers.length === 1) {
          merged = available_pointers[0];
        } else {
          merged = state.pointers.reduce((acc, curr) => {
            if (curr !== "") {
              acc = chroma(acc).mix(curr).hex();
            }
            return acc;
          }, "#ffffff");
        }

        return {
          stage: det_stage,
          pointers: state.pointers.map((p: string, i: number) => {
            if (det_stage === "free") {
              return p ? p : "";
            }
            let color = merged; // pick the near pointer or ???
            return i === 5 ? color : "";
          }),
        };
      }),
  }));
};

export const usePointers = <T>(selector: (state: PointersState) => T) => {
  const store = useContext(PointersContext);
  if (!store) throw new Error("Missing PointerContext.Provider in the tree");
  return useStore(store, selector);
};

export const usePointersDomain = (): DomainLayout => {
  const pointers = usePointers((state) => state.pointers);
  const stage = usePointers((state) => state.stage);

  const indices: Array<number> = [];
  const hex: Array<string> = [];

  let i = 0;

  while (i < pointers.length) {
    const color = pointers[i];

    if (color !== "") {
      hex.push(color);
      indices.push(i);
    }

    i++;
  }
  if (stage === "free") {
    // set black color as default if there is not pointer on the right side
    if (pointers.at(-1) === "") {
      hex.push("#000000");
      indices.push(pointers.length - 1);
    }

    // set white color as default if there is not pointer on the left side
    if (pointers.at(0) === "") {
      hex.unshift("#ffffff");
      indices.unshift(0);
    }
  }

  if (stage === "shade") {
    if (hex.length !== 3 && indices.length !== 3) {
      const master_shade = hex[0] || "#0000ff"; // pick random?
      let lighten_shade = chroma(master_shade).mix("#ffffff", 0.9);
      let darken_shade = chroma(master_shade).mix("#000000", 0.95);

      hex.unshift(chroma(lighten_shade).hex());
      indices.unshift(0);
      hex.push(chroma(darken_shade).hex());
      indices.push(10);
    }
  }

  return {
    indices,
    hex,
  } as DomainLayout;
};
