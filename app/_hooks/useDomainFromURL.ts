import { useSearchParams } from "next/navigation";
import { DomainLayout } from "../types";
import { default_tw_color_domains } from "@/app/constants";
import chroma from "chroma-js";
import { validate_hex, validate_indices } from "@/app/_utils/validators";

// this maybe can be randomly generated, or selected from tw_color_domains, idk.
const default_domain: DomainLayout = {
  hex: ["#cccccc", "#23901e"],
  indices: [0, 10],
};

export const useDomainFromURL = (): DomainLayout => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "mellow berry";
  const as_palette = default_tw_color_domains[name.split(" ").join("_")];

  let hex: string[] = [];
  let indices: number[] = [];
  try {
    hex = JSON.parse(searchParams.get("p") || "[]");
    indices = JSON.parse(searchParams.get("i") || "[]");
  } catch {
    hex = default_domain.hex;
    indices = default_domain.indices;
  }

  const valid_hex = validate_hex(hex);
  const valid_indices = validate_indices(indices);

  let domain: DomainLayout = {
    hex: [],
    indices: [],
  };

  if (valid_hex && valid_indices && hex.length === indices.length) {
    domain = {
      hex,
      indices,
    };
  } else if (as_palette) {
    domain.hex = as_palette.hex;
    domain.indices = as_palette.indices;
  } else {
    domain = default_domain;
  }

  return domain;
};
