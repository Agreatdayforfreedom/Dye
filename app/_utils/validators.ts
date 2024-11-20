import chroma from "chroma-js";
import { DomainLayout } from "../types";

export function validate_hex(arr: DomainLayout["hex"]): boolean {
  if (arr.length === 0) return false;
  return arr.every((c: string) => chroma.valid(c) === true);
}

export function validate_indices(ind: DomainLayout["indices"]): boolean {
  let prev = 0;
  let valid = false;

  for (let i = 0; i < ind.length; i++) {
    const c = ind[i];
    if (i === 0 && c === 0) {
      valid = true;
      continue;
    }
    if (c > prev) {
      prev = c;
      valid = true;
    } else {
      return false;
    }
  }

  return valid;
}
