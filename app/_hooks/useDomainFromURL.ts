import { useSearchParams } from "next/navigation";
import { DomainLayout } from "../types";
import { default_tw_color_domains } from "../constants";
import chroma from "chroma-js";
import { validate_hex, validate_indices } from "../_utils/validators";

export const useDomainFromURL = (): DomainLayout => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "mellow berry";
  const as_palette = default_tw_color_domains[name.split(" ").join("_")];

  //todo fix parsing JSON errors
  let hex: string[] = JSON.parse(searchParams.get("p") || "[]");
  let indices: number[] = JSON.parse(searchParams.get("i") || "[]");

  const valid_hex = validate_hex(hex);
  const valid_indices = validate_indices(indices);

  let domain: DomainLayout = {
    hex: [],
    indices: [],
  };

  if (valid_hex && valid_indices) {
    domain = {
      hex,
      indices,
    };
  } else if (as_palette) {
    domain.hex = as_palette.hex;
    domain.indices = as_palette.indices;
  } else {
    domain.hex = ["#cccccc", "#23901e"];
    domain.indices = [0, 10];
  }

  return domain;
};
