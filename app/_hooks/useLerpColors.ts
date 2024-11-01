import { useMemo, useState } from "react";
import chroma from "chroma-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useVariables } from "@/app/store/variables";
import { usePointersDomain } from "@/app/store/pointers";

export const useLerpColors = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = useVariables((state) => state.type);
  const [steps, setSteps] = useState<number>(() => (type === "tw" ? 11 : 8));

  const saturation = useVariables((state) => state.saturation);
  const brightness = useVariables((state) => state.brightness);
  const colorSpace = useVariables((state) => state.colorSpace);
  const hue = useVariables((state) => state.hue);
  const { indices, hex } = usePointersDomain();

  const params = new URLSearchParams(searchParams);

  let colors = useMemo(() => {
    let no_update_pointer_index = 0;

    //todo
    params.set("p", JSON.stringify(hex));
    params.set("i", JSON.stringify(indices));
    params.set("b", brightness.toString());
    params.set("s", saturation.toString());
    params.set("h", hue.toString());
    params.set("cs", colorSpace);

    router.replace(`${pathname}?${params.toString()}`);

    return chroma
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
      });
  }, [hex, colorSpace, saturation, hue, brightness]);

  return { colors, steps };
};
