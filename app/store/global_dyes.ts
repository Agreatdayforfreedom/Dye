import { create } from "zustand";

interface GlobalDyesState {
  border_dye: string;
  title_dye: string;
  border_shadow_dye: string;
  text_dye: string;
  bg_dye: string;
}
interface GlobalDyesAction {
  setDyes: (dyes: GlobalDyesState) => void;
}

export const useGlobalDyes = create<GlobalDyesState & GlobalDyesAction>(
  (set) => ({
    border_dye: "",
    title_dye: "",
    border_shadow_dye: "",
    text_dye: "",
    bg_dye: "",
    setDyes: (dyes: GlobalDyesState) =>
      set(() => ({
        ...dyes,
      })),
  })
);
