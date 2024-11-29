export interface DomainLayout {
  indices: Array<number>;
  hex: Array<string>;
}

export interface Attributes {
  hue: number;
  brightness: number;
  saturation: number;
  space: chroma.InterpolationMode;
  stage: PointerStage;
}

export type PointerStage = "free" | "shade";
