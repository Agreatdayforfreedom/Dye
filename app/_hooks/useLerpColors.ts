import { useEffect, useMemo, useState } from "react";
import { useVariables } from "../store/variables";
import { usePointersDomain } from "../store/pointers";
import chroma from "chroma-js";

export const useLerpColors = () => {
  const type = useVariables((state) => state.type);

  const [steps, setSteps] = useState<number>(() => (type === "tw" ? 11 : 8));

  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);
  const hue = useVariables((state) => state.hue);
  const { indices, hex } = usePointersDomain();

  // let steps = 11;

  let colors = useMemo(() => {
    let no_update_pointer_index = 0;
    return (
      chroma
        // .bezier([...hex])
        .scale([...hex])
        .mode(colorSpace)
        .domain([...indices])
        .colors(steps)
        .map((c, i) => {
          let color = chroma(c);
          let current_hue = color.get("hsv.h") || 0;

          let new_hue = current_hue;

          if (indices[no_update_pointer_index] != i) {
            console.log(indices[i], i);
            new_hue += hue;
          } else {
            no_update_pointer_index++;
          }
          return color.saturate(saturation / 50).set("hsv.h", new_hue);
        })
    );
  }, [hex, colorSpace, saturation, hue]);

  return { colors, steps };
};
