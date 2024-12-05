import { MoonIcon, SunIcon } from "lucide-react";
import React from "react";
import { useDarkMode } from "../store/dark_mode";

const ToggleDarkMode = () => {
  const toggleDarkMode = useDarkMode((state) => state.toggleDarkMode);
  const mode = useDarkMode((state) => state.mode);

  return (
    <button onClick={toggleDarkMode}>
      {mode === "dark" ? (
        <MoonIcon className="hover:-rotate-12 transition-transform" />
      ) : (
        <SunIcon className="hover:rotate-[65deg] transition-transform" />
      )}
    </button>
  );
};

export default ToggleDarkMode;
