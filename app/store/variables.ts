import chroma from "chroma-js";
import { create } from "zustand";

interface VariablesState {
  colors: Array<chroma.Color>;
  type: Type;
  name: string;
  saturation: number;
  colorSpace: chroma.InterpolationMode;
}

interface VariablesAction {
  setColors: (colors: Array<chroma.Color>) => void;
  setName: (name: string) => void;
  setType: (type: Type) => void;
  setSaturation: (saturation: number) => void;
  setColorSpace: (colorSpace: chroma.InterpolationMode) => void;
}

type Type = "tw" | "custom";

export const useVariables = create<VariablesState & VariablesAction>((set) => ({
  colors: [],
  type: "tw",
  name: "Autumn",
  saturation: 0,
  colorSpace: "rgb",

  setColors: (colors: Array<chroma.Color>) => set((_) => ({ colors })),
  setName: (name: string) => set((_) => ({ name })),
  setType: (type: Type) => set((_) => ({ type })),
  setSaturation: (saturation: number) => set((_) => ({ saturation })),
  setColorSpace: (colorSpace: chroma.InterpolationMode) =>
    set((_) => ({ colorSpace })),
}));
