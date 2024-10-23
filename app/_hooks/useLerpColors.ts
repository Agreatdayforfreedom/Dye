import { useMemo } from "react";
import { useVariables } from "../store/variables";
import { usePointersDomain } from "../store/pointers";
import chroma from "chroma-js";

export const useLerpColors = () => {
  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);
  const { indices, hex } = usePointersDomain();

  let steps = 11; // todo, number of steps can adjust to tailwind, custom palette, etc

  let colors = useMemo(() => {
    return chroma
      .scale([...hex])
      .mode(colorSpace)
      .domain([...indices])
      .colors(steps)
      .map((x, i) => {
        return chroma.hex(x).saturate(saturation);
      });
  }, [hex, colorSpace, saturation]);

  return colors;
};
