import { createContext, useContext } from "react";
import { create, createStore, useStore } from "zustand";

interface GlobalDyesProps {
  border_dye: string;
  title_dye: string;
  border_shadow_dye: string;
  text_dye: string;
  bg_dye: string;
}

interface GlobalDyesState extends GlobalDyesProps {
  setDyes: (dyes: GlobalDyesState) => void;
}

type GlobalDyesStore = ReturnType<typeof createGlobalDyesStore>;

export const GlobalDyesContext = createContext<GlobalDyesStore | null>(null);

export const createGlobalDyesStore = (initProps?: Partial<GlobalDyesProps>) => {
  const DEFAULT_PROPS: GlobalDyesProps = {
    border_dye: "",
    title_dye: "",
    border_shadow_dye: "",
    text_dye: "",
    bg_dye: "",
  };

  return createStore<GlobalDyesState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setDyes: (dyes: GlobalDyesState) =>
      set(() => ({
        ...dyes,
      })),
  }));
};

export const useGlobalDyes = <T>(selector: (state: GlobalDyesState) => T) => {
  const store = useContext(GlobalDyesContext);
  if (!store) throw new Error("Missing GlobalDyesContext.Provider in the tree");
  return useStore(store, selector);
};
