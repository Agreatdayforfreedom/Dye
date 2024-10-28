import { create } from "zustand";

interface PointersState {
  pointers: Array<string>;
}

interface Domain {
  indices: Array<number>;
  hex: Array<string>;
}

interface PointersAction {
  setPointer: (index: number, color: string) => void;
  undoPointer: (index: number) => void;
}

export const usePointers = create<PointersState & PointersAction>((set) => ({
  pointers: [
    "#a34f0a",
    "",
    "",
    "",
    "#71250e",
    "",
    "",
    "#6f6534",
    "",
    "",
    "#365365",
  ],
  setPointer: (index: number, color: string) =>
    set((state) => ({
      pointers: state.pointers.map((p: string, i: number) =>
        i === index ? color : p
      ),
    })),
  undoPointer: (index: number) => {
    set((state) => ({
      pointers: state.pointers.map((p, i) => (i === index ? "" : p)),
    }));
  },
}));

export const usePointersDomain = (): Domain => {
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
  } as Domain;
};
