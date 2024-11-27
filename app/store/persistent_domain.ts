import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Attributes, DomainLayout } from "@/app/types";

type KeyDomain = { [key: string]: DomainLayout & Attributes };

interface PersistentState {
  domains: KeyDomain;
  setDomain: (key: string, domain: DomainLayout, attrs: Attributes) => void;
  exists: (key: string) => boolean;
}

export const usePersistentStore = create<PersistentState>()(
  persist(
    (set, get) => ({
      domains: {},
      setDomain: (key: string, domain: DomainLayout, attrs: Attributes) =>
        set({
          domains: {
            ...get().domains,
            [key]: {
              hex: domain.hex,
              indices: domain.indices,
              brightness: attrs.brightness,
              hue: attrs.hue,
              saturation: attrs.saturation,
              space: attrs.space,
            },
          },
        }),
      exists: (key: string) => {
        return Object.keys(get().domains).some((k) => k === key);
      },
    }),
    {
      name: "domains",
    }
  )
);
