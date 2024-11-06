import chroma from "chroma-js";
import { create } from "zustand";

interface VariablesState {
  colors: Array<chroma.Color>;
  type: Type;
  name: string;
  hue: number;
  saturation: number;
  brightness: number;
  colorSpace: chroma.InterpolationMode;
}

interface VariablesAction {
  setColors: (colors: Array<chroma.Color>) => void;
  setName: (name: string) => void;
  setType: (type: Type) => void;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setBrightness: (brightness: number) => void;
  setColorSpace: (colorSpace: chroma.InterpolationMode) => void;
}

type Type = "tw" | "custom";

export const useVariables = create<VariablesState & VariablesAction>((set) => ({
  colors: [],
  type: "tw",
  name: "Autumn",
  hue: 0,
  saturation: 0,
  brightness: 0,
  colorSpace: "rgb",

  setColors: (colors: Array<chroma.Color>) => set(() => ({ colors })),
  setName: (name: string) => set(() => ({ name })),
  setType: (type: Type) => set(() => ({ type })),
  setSaturation: (saturation: number) => set(() => ({ saturation })),
  setBrightness: (brightness: number) => set(() => ({ brightness })),
  setHue: (hue: number) => set(() => ({ hue })),
  setColorSpace: (colorSpace: chroma.InterpolationMode) =>
    set(() => ({ colorSpace })),
}));
