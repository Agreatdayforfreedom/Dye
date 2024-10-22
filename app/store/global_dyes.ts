import { create } from "zustand";

interface GlobalDyesState {
  dye1: string;
  dye2: string;
  dye3: string;
  dye4: string;
  dye5: string;
}
interface GlobalDyesAction {
  setDye: (dyes: GlobalDyesState) => void;
}

export const useGlobalDyes = create<GlobalDyesState & GlobalDyesAction>(
  (set) => ({
    dye1: "",
    dye2: "",
    dye3: "",
    dye4: "",
    dye5: "",
    setDye: (dyes: GlobalDyesState) =>
      set(() => ({
        ...dyes,
      })),
  })
);
