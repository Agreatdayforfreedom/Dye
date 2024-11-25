import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainLayout } from "@/app/types";

type KeyDomain = { [key: string]: DomainLayout };

interface PersistentState {
  domains: KeyDomain;
  setDomain: (key: string, domain: DomainLayout) => void;
  exists: (key: string) => boolean;
}

export const usePersistentStore = create<PersistentState>()(
  persist(
    (set, get) => ({
      domains: {},
      setDomain: (key: string, domain: DomainLayout) =>
        set({
          domains: {
            ...get().domains,
            [key]: domain,
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
