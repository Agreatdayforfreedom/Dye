import { create } from "zustand";

interface DarkModeState {
  mode: "dark" | "light";
}
interface DarkModeAction {
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeState & DarkModeAction>((set) => ({
  mode: "light",
  toggleDarkMode: () =>
    set((state) => ({
      mode: state.mode === "dark" ? "light" : "dark",
    })),
}));
