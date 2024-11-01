import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

import { DomainLayout } from "@/app/types";
import { d2p } from "@/app/_utils/d2p";

const TW_STEPS: number = 11;

interface PointersProps {
  pointers: Array<string>;
}

interface PointersState extends PointersProps {
  setPointer: (index: number, color: string) => void;
  setPointerFromDomain: (domain: DomainLayout) => void;
  undoPointer: (index: number) => void;
}

type PointerStore = ReturnType<typeof createPointersStore>;

export const PointersContext = createContext<PointerStore | null>(null);

export const createPointersStore = (initProps?: Partial<PointersProps>) => {
  const DEFAULT_PROPS: PointersProps = {
    pointers: ["", "", "", "", "", "", "", "", "", "", ""],
  };
  return createStore<PointersState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setPointer: (index: number, color: string) =>
      set((state) => ({
        pointers: state.pointers.map((p: string, i: number) =>
          i === index ? color : p
        ),
      })),
    setPointerFromDomain: (domain: DomainLayout) =>
      set(() => ({
        pointers: d2p(domain, TW_STEPS),
      })),
    undoPointer: (index: number) => {
      set((state) => ({
        pointers: state.pointers.map((p: string, i: number) =>
          i === index ? "" : p
        ),
      }));
    },
  }));
};

export const usePointers = <T>(selector: (state: PointersState) => T) => {
  const store = useContext(PointersContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
};

export const usePointersDomain = (): DomainLayout => {
  let i = 0;
  let pointers = usePointers((state) => state.pointers);
  let indices: Array<number> = [];
  let hex: Array<string> = [];
  while (i < pointers.length) {
    let color = pointers[i];

    if (color !== "") {
      hex.push(color);
      indices.push(i);
    }

    i++;
  }

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

  return {
    indices,
    hex,
  } as DomainLayout;
};
