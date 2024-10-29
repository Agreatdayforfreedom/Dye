import React, { useEffect } from "react";
import { DomainLayout } from "../types";
import { usePointers } from "../store/pointers";
import { useLerpColors } from "../_hooks/useLerpColors";
import chroma from "chroma-js";
import { useVariables } from "../store/variables";

export const Palettes = () => {
  const gradients: { [key: string]: DomainLayout } = {
    tropical_sunrise: {
      hex: ["#FF9F45", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
      indices: [0, 3, 5, 7, 10],
    },
    cosmic_dreams: {
      hex: ["#3F37C9", "#4895EF", "#4CC9F0", "#4361EE", "#7209B7"],
      indices: [0, 3, 5, 7, 10],
    },
    pastel_sunset: {
      hex: ["#FFAFCC", "#FFC8DD", "#BDE0FE", "#A2D2FF", "#BDB2FF"],
      indices: [0, 3, 5, 7, 10],
    },
    aurora_nights: {
      hex: ["#5EEAD4", "#3B82F6", "#A78BFA", "#9333EA", "#EC4899"],
      indices: [0, 3, 5, 7, 10],
    },
    mellow_berry: {
      hex: ["#FECDD3", "#F472B6", "#D946EF", "#9333EA", "#6B21A8"],
      indices: [0, 3, 5, 7, 10],
    },
    sandy_shores: {
      hex: ["#FDE68A", "#FCD34D", "#F59E0B", "#F97316", "#EA580C"],
      indices: [0, 3, 5, 7, 10],
    },
    mystic_forest: {
      hex: ["#A3E635", "#4ADE80", "#16A34A", "#15803D", "#166534"],
      indices: [0, 3, 5, 7, 10],
    },
    deep_space: {
      hex: ["#0F172A", "#1E3A8A", "#4338CA", "#6366F1", "#A78BFA"],
      indices: [0, 3, 5, 7, 10],
    },
  };

  const asComponentArray = () => {
    let palettes: [string, DomainLayout][] = [];

    for (const keyname in gradients) {
      palettes.push([keyname, gradients[keyname]]);
    }

    return palettes;
  };
  return (
    <div>
      {asComponentArray().map(([keyname, domain]) => (
        <Palette domain={domain} name={keyname} />
      ))}
    </div>
  );
};

const Palette = ({ name, domain }: { name: string; domain: DomainLayout }) => {
  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const setName = useVariables((state) => state.setName);

  let colors = chroma
    .scale([...domain.hex])
    .mode("rgb")
    .domain([...domain.indices])
    .colors(11);
  return (
    <div>
      <button
        onClick={() => {
          setPointerFromDomain(domain);
          setName(name);
        }}
        className="flex size-6 hover:scale-125 transition-transform cursor-pointer"
      >
        <div>
          <div className="size-3" style={{ background: colors[0] }} />
          <div className="size-3" style={{ background: colors[3] }} />
        </div>
        <div>
          <div className="size-3" style={{ background: colors[7] }} />
          <div className="size-3" style={{ background: colors[10] }} />
        </div>
      </button>
      <span className="capitalize">{name.split("_").join(" ")}</span>
      <div className="w-500 flex">
        {colors.map((c) => (
          <div className="h-8 w-6" style={{ background: c }}></div>
        ))}
      </div>
    </div>
  );
};
