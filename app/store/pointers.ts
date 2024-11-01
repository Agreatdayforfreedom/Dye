import { create } from "zustand";

import { DomainLayout } from "@/app/types";

const TW_STEPS: number = 11;

interface PointersState {
  pointers: Array<string>;
}

interface PointersAction {
  setPointer: (index: number, color: string) => void;
  setPointerFromDomain: (domain: DomainLayout) => void;
  undoPointer: (index: number) => void;
}

export const usePointers = create<PointersState & PointersAction>((set) => ({
  pointers: ["", "", "", "", "", "", "", "", "", "", ""],
  setPointer: (index: number, color: string) =>
    set((state) => ({
      pointers: state.pointers.map((p: string, i: number) =>
        i === index ? color : p
      ),
    })),
  setPointerFromDomain: (domain: DomainLayout) =>
    set((state) => {
      let iterated = 0;
      return {
        pointers: state.pointers.map((_, i: number) => {
          if (domain.indices[iterated] === i) {
            return domain.hex[iterated++];
          } else {
            return "";
          }
        }),
      };
    }),
  undoPointer: (index: number) => {
    set((state) => ({
      pointers: state.pointers.map((p: string, i: number) =>
        i === index ? "" : p
      ),
    }));
  },
}));

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
