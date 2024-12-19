export interface DomainLayout {
  indices: Array<number>;
  hex: Array<string>;
}

export type KeyDomain = { [key: string]: DomainLayout & Attributes };

export interface Attributes {
  name?: string;
  hue: number;
  brightness: number;
  saturation: number;
  space: chroma.InterpolationMode;
  stage: PointerStage;
}

export type PointerStage = "free" | "shade";

type PossibleParamKeys = "p" | "i" | "stage" | "b" | "s" | "h" | "cs" | "name";

export type Params = {
  [key in PossibleParamKeys]: string | undefined;
};
