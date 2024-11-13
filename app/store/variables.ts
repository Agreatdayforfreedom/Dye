import chroma from "chroma-js";
import { createContext, useContext } from "react";
import { create, createStore, useStore } from "zustand";

interface VariablesProps {
  colors: Array<chroma.Color>;
  type: Type;
  name: string;
  hue: number;
  saturation: number;
  brightness: number;
  colorSpace: chroma.InterpolationMode;
}

interface VariablesState extends VariablesProps {
  setColors: (colors: Array<chroma.Color>) => void;
  setName: (name: string) => void;
  setType: (type: Type) => void;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setBrightness: (brightness: number) => void;
  setColorSpace: (colorSpace: chroma.InterpolationMode) => void;
}

type VariableStore = ReturnType<typeof createVariablesStore>;

type Type = "tw" | "custom";

export const VariablesContext = createContext<VariableStore | null>(null);

export const createVariablesStore = (initProps?: Partial<VariablesProps>) => {
  const DEFAULT_PROPS: VariablesProps = {
    colors: [],
    type: "tw",
    name: "Autumn",
    hue: 0,
    saturation: 0,
    brightness: 0,
    colorSpace: "rgb",
  };
  return createStore<VariablesState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setColors: (colors: Array<chroma.Color>) => set(() => ({ colors })),
    setName: (name: string) => set(() => ({ name })),
    setType: (type: Type) => set(() => ({ type })),
    setSaturation: (saturation: number) => set(() => ({ saturation })),
    setBrightness: (brightness: number) => set(() => ({ brightness })),
    setHue: (hue: number) => set(() => ({ hue })),
    setColorSpace: (colorSpace: chroma.InterpolationMode) =>
      set(() => ({ colorSpace })),
  }));
};

export const useVariables = <T>(selector: (state: VariablesState) => T) => {
  const store = useContext(VariablesContext);
  if (!store) throw new Error("Missing VariablesContext.Provider in the tree");
  return useStore(store, selector);
};
