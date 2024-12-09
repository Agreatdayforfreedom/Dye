import chroma from "chroma-js";
import { DomainLayout } from "@/app/types";
import { default_domain } from "@/app/constants";

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

export function validate_domain(
  hex: DomainLayout["hex"],
  indices: DomainLayout["indices"],
  stage: "free" | "shade",
  as_palette?: DomainLayout
): DomainLayout {
  const valid_hex = validate_hex(hex);
  const valid_indices = validate_indices(indices);

  let domain: DomainLayout = {
    hex: [],
    indices: [],
  };

  const is_valid_domain =
    valid_hex && valid_indices && hex.length === indices.length;
  if (is_valid_domain) {
    domain = {
      hex,
      indices,
    };
  } else if (stage === "shade") {
    domain.hex = ["#00ffff"];
    domain.indices = [5];
  } else if (as_palette) {
    domain.hex = as_palette.hex;
    domain.indices = as_palette.indices;
  } else {
    domain = default_domain;
  }

  return domain;
}
