import { useEffect, useMemo, useState } from "react";
import { useVariables } from "../store/variables";
import { usePointersDomain } from "../store/pointers";
import chroma from "chroma-js";

export const useLerpColors = () => {
  const type = useVariables((state) => state.type);

  const [steps, setSteps] = useState<number>(() => (type === "tw" ? 11 : 8));

  const saturation = useVariables((state) => state.saturation);
  const brightness = useVariables((state) => state.brightness);
  const colorSpace = useVariables((state) => state.colorSpace);
  const hue = useVariables((state) => state.hue);
  const { indices, hex } = usePointersDomain();

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
          let current_brh = color.get("hsv.v") || 0;
          let current_sat = color.get("hsv.s") || 0;

          let new_hue = current_hue;
          let new_brh = current_brh;
          let new_sat = current_sat;

          if (indices[no_update_pointer_index] != i) {
            new_hue += hue;
            new_brh += brightness / 25;
            new_sat += saturation / 50;
          } else {
            no_update_pointer_index++;
          }
          return color
            .set("hsv.h", new_hue)
            .set("hsv.s", new_sat)
            .set("hsv.v", new_brh);
        })
    );
  }, [hex, colorSpace, saturation, hue, brightness]);

  return { colors, steps };
};
