import React from "react";
import { Shuffle } from "lucide-react";
import { usePointers } from "../store/pointers";
import chroma from "chroma-js";
import { useGlobalDyes } from "../store/global_dyes";

export const Randomize = () => {
  const l5 = useGlobalDyes((state) => state.l5);

  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const stage = usePointers((state) => state.stage);
  function randomize() {
    if (stage === "shade") {
      setPointerFromDomain({
        hex: [chroma.random().hex()],
        indices: [5],
      });
      return;
    }

    let indices = [];
    let hex = [];
    let i = 0;
    let n = 11;
    while (i < n) {
      if (Math.random() < 0.26666) {
        indices.push(i);
        hex.push(chroma.random().hex());
      }
      i++;
    }

    setPointerFromDomain({
      indices,
      hex,
    });
  }

  return (
    <button onClick={randomize} className="flex items-end gap-1">
      <span className="text-sm">Randomize</span>
      <Shuffle stroke={l5} size={18} />
    </button>
  );
};
