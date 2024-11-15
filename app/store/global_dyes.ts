import { createContext, useContext } from "react";
import { create, createStore, useStore } from "zustand";

interface GlobalDyesProps {
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  l6: string;
  l7: string;
  l8: string;
  l9: string;
  l10: string;
  l11: string;
}

export interface GlobalDyesState extends GlobalDyesProps {
  setDyes: (dyes: GlobalDyesState) => void;
}

type GlobalDyesStore = ReturnType<typeof createGlobalDyesStore>;

export const GlobalDyesContext = createContext<GlobalDyesStore | null>(null);

export const createGlobalDyesStore = (initProps?: Partial<GlobalDyesProps>) => {
  const DEFAULT_PROPS: GlobalDyesProps = {
    l1: "",
    l2: "",
    l3: "",
    l4: "",
    l5: "",
    l6: "",
    l7: "",
    l8: "",
    l9: "",
    l10: "",
    l11: "",
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

/**
 * the colors are ordered by lumincance: **l1** is the most brightest and **l11** the most darkest
 * */
export const useGlobalDyes = <T>(selector: (state: GlobalDyesState) => T) => {
  const store = useContext(GlobalDyesContext);
  if (!store) throw new Error("Missing GlobalDyesContext.Provider in the tree");
  return useStore(store, selector);
};
