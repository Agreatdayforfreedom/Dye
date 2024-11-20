import { useEffect, useMemo, useState } from "react";
import chroma from "chroma-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useVariables } from "@/app/store/variables";
import { usePointersDomain } from "@/app/store/pointers";
import { lerp_colors } from "../_utils/lerp_colors";

export const useLerpColors = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = useVariables((state) => state.name);
  const type = useVariables((state) => state.type);
  const [steps] = useState<number>(() => (type === "tw" ? 11 : 8));

  const saturation = useVariables((state) => state.saturation);
  const brightness = useVariables((state) => state.brightness);
  const colorSpace = useVariables((state) => state.colorSpace);
  const hue = useVariables((state) => state.hue);
  const { indices, hex } = usePointersDomain();

  const params = new URLSearchParams(searchParams);

  const colors = useMemo(() => {
    return lerp_colors(
      {
        hex,
        indices,
      },
      colorSpace,
      hue,
      brightness,
      saturation,
      steps
    );
  }, [hex, colorSpace, saturation, hue, brightness]);

  useEffect(() => {
    //todo : alidate this
    params.set("p", JSON.stringify(hex));
    params.set("i", JSON.stringify(indices));
    params.set("b", brightness.toString());
    params.set("s", saturation.toString());
    params.set("h", hue.toString());
    params.set("cs", colorSpace);
    params.set("name", name);

    router.replace(`${pathname}?${params.toString()}`);
  }, [hex, colorSpace, saturation, hue, brightness]);

  return { colors, steps };
};
