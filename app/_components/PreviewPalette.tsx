import chroma from "chroma-js";

import { DomainLayout } from "@/app/types";
import { usePointers } from "@/app/store/pointers";
import { useVariables } from "@/app/store/variables";

interface Props {
  name: string;
  domain: DomainLayout;
  setSelected: (colors: string[]) => void;
}

export const PreviewPalette = ({ name, domain, setSelected }: Props) => {
  const setPointerFromDomain = usePointers(
    (state) => state.setPointerFromDomain
  );
  const setName = useVariables((state) => state.setName);

  const colors = chroma
    .scale([...domain.hex])
    .mode("rgb")
    .domain([...domain.indices])
    .colors(11);
  return (
    <div
      className="w-500 flex cursor-pointer hover:scale-105 transition-transform"
      onClick={() => {
        setSelected(colors);
        setPointerFromDomain(domain);
        setName(name.split("_").join(" "));
      }}
    >
      {colors.map((c, index) => (
        <div key={index} className="h-8 w-6" style={{ background: c }}></div>
      ))}
    </div>
  );
};
