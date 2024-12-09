import chroma from "chroma-js";
import { Attributes, DomainLayout, PointerStage } from "../types";

type PossibleParamKeys = "p" | "i" | "stage" | "b" | "s" | "h" | "cs" | "name";
export type Params = {
  [key in PossibleParamKeys]: string | undefined;
};

export function map_params(params: Params): DomainLayout & Attributes {
  const domain: DomainLayout = {
    hex: JSON.parse(params.p || "[]"),
    indices: JSON.parse(params.i || "[]"),
  };
  const attr: Attributes = {
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
