import chroma from "chroma-js";
import { Attributes, DomainLayout, Params, PointerStage } from "@/app/types";

export function map_params(params: Params): DomainLayout & Attributes {
  const domain: DomainLayout = {
    hex: JSON.parse(params.p || "[]"),
    indices: JSON.parse(params.i || "[]"),
  };
  const attr: Attributes = {
    name: params.name || "None",
    brightness: parseInt(params.b || "0"),
    saturation: parseInt(params.s || "0"),
    hue: parseInt(params.h || "0"),
    space: (params.cs as chroma.InterpolationMode) || "rgb",
    stage: (params.stage as PointerStage) || "free",
  };

  return {
    ...domain,
    ...attr,
  } as DomainLayout & Attributes;
}
