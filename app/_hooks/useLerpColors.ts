import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useVariables } from "@/app/store/variables";
import { usePointers, usePointersDomain } from "@/app/store/pointers";
import { lerp_colors } from "../_utils/lerp_colors";
import { useThrottleSearchParams } from "./useThrottleSearchParams";

export const useLerpColors = () => {
  const name = useVariables((state) => state.name);
  const saturation = useVariables((state) => state.saturation);
  const brightness = useVariables((state) => state.brightness);
  const colorSpace = useVariables((state) => state.colorSpace);
  const hue = useVariables((state) => state.hue);
  const { indices, hex } = usePointersDomain();
  const stage = usePointers((state) => state.stage);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const router = useRouter();
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
      11
    );
  }, [JSON.stringify(hex), colorSpace, saturation, hue, brightness]);

  // useEffect(() => {
  //   params.set("stage", stage);
  //   params.set("p", JSON.stringify(hex));
  //   params.set("i", JSON.stringify(indices));
  //   params.set("b", brightness.toString());
  //   params.set("s", saturation.toString());
  //   params.set("h", hue.toString());
  //   params.set("cs", colorSpace);
  //   params.set("name", name);

  //   router.replace(`${pathname}?${params.toString()}`);
  // }, [
  //   JSON.stringify(hex),
  //   colorSpace,
  //   saturation,
  //   hue,
  //   brightness,
  //   name,
  //   stage,
  // ]);

  useThrottleSearchParams(
    ["p", "i", "cs", "s", "h", "b", "name", "stage"],
    [
      JSON.stringify(hex),
      JSON.stringify(indices),
      colorSpace,
      saturation.toString(),
      hue.toString(),
      brightness.toString(),
      name,
      stage,
    ]
  );

  return { colors };
};
