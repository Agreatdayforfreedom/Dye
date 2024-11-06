// transform domain to pointers

import { DomainLayout } from "@/app/types";

export const d2p = (domain: DomainLayout, n: number): string[] => {
  let iterated = 0;
  let i = 0;
  const pointers = [];
  while (i < n) {
    if (domain.indices[iterated] === i) {
      pointers.push(domain.hex[iterated++]);
    } else {
      pointers.push("");
    }

    i++;
  }

  return pointers;
};
