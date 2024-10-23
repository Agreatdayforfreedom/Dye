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
  pointers: ["red", "", "", "", "", "", "", "", "", "", "blue"],
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

  return {
    indices,
    hex,
  } as Domain;
};
