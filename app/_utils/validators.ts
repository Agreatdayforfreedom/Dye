import chroma from "chroma-js";
import { DomainLayout } from "../types";

export function validate_hex(arr: DomainLayout["hex"]): boolean {
  return arr.every((c: string) => chroma.valid(c) === true);
}

export function validate_indices(ind: DomainLayout["indices"]): boolean {
  let prev = 0;
  let valid = false;
  for (let i = 0; i < ind.length; i++) {
    let c = ind[i];

    if (c > prev) {
      prev = c;
      valid = true;
    } else {
      valid = false;
    }
  }

  return valid;
}
