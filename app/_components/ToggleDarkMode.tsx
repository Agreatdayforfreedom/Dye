import { MoonIcon, SunIcon } from "lucide-react";
import React, { useState } from "react";
import { useDarkMode } from "../store/dark_mode";

const ToggleDarkMode = () => {
  const toggleDarkMode = useDarkMode((state) => state.toggleDarkMode);
  const mode = useDarkMode((state) => state.mode);

  return (
    <button onClick={toggleDarkMode}>
      {mode === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ToggleDarkMode;
