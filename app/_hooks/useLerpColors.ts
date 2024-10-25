import { useEffect, useMemo, useState } from "react";
import { useVariables } from "../store/variables";
import { usePointersDomain } from "../store/pointers";
import chroma from "chroma-js";

export const useLerpColors = () => {
  const type = useVariables((state) => state.type);

  const [steps, setSteps] = useState<number>(() => (type === "tw" ? 11 : 8));

  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);
  const { indices, hex } = usePointersDomain();

  // let steps = 11;

  let colors = useMemo(() => {
    return (
      chroma
        // .bezier([...hex])
        .scale([...hex])
        .mode(colorSpace)
        .domain([...indices])
        .colors(steps)
        .map((x, i) => {
          return chroma(x).saturate(saturation);
        })
    );
  }, [hex, colorSpace, saturation]);

  return colors;
};
