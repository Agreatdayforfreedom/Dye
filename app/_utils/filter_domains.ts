import { tw_color_scale } from "../constants";
import { DomainLayout } from "../types";

type DomainSaveFilter = {
  [key: string]: {
    "+": string | undefined;
    "-": string | undefined;
  };
};

export function filter_domains(a: DomainLayout, b: DomainLayout) {
  const fixed_to_tw_layout: DomainSaveFilter = {};
  let i = 0;
  let j = 0;

  while (i < 11) {
    fixed_to_tw_layout[tw_color_scale[i]] = {
      "+": undefined,
      "-": undefined,
    };
    if (j < 11 && a.indices[j] == i) {
      fixed_to_tw_layout[tw_color_scale[i]]["+"] = a.hex[j];
      j++;
    } else {
      fixed_to_tw_layout[tw_color_scale[i]]["+"] = undefined;
    }
    i++;
  }

  i = j = 0;

  while (i < 11) {
    if (j < 11 && b.indices[j] == i) {
      fixed_to_tw_layout[tw_color_scale[i]]["-"] = b.hex[j];
      j++;
    } else {
      fixed_to_tw_layout[tw_color_scale[i]]["-"] = undefined;
    }
    i++;
  }

  i = 0;
  const result: DomainSaveFilter = {};
  while (i < 11) {
    if (
      fixed_to_tw_layout[tw_color_scale[i]]["-"] !==
      fixed_to_tw_layout[tw_color_scale[i]]["+"]
    ) {
      result[tw_color_scale[i]] = {
        "-": fixed_to_tw_layout[tw_color_scale[i]]["-"],
        "+": fixed_to_tw_layout[tw_color_scale[i]]["+"],
      };
    }
    i++;
  }

  return result;
}
