import { useSearchParams } from "next/navigation";
import { DomainLayout, PointerStage } from "../types";
import { default_tw_color_domains } from "@/app/constants";
import { validate_domain } from "../_utils/validators";

export const useDomainFromURL = (): DomainLayout => {
  const searchParams = useSearchParams();
  const stage = (searchParams.get("stage") as PointerStage) || "free";

  const name = searchParams.get("name") || "mellow berry";
  const as_palette = default_tw_color_domains[name.split(" ").join("_")];

  let hex: string[] = [];
  let indices: number[] = [];
  try {
    hex = JSON.parse(searchParams.get("p") || "[]");
    indices = JSON.parse(searchParams.get("i") || "[]");
  } catch {
    // hex = default_domain.hex;
    // indices = default_domain.indices;
  }

  return validate_domain(hex, indices, stage, as_palette);
};
