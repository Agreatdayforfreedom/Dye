import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DomainLayout } from "../types";
import { experimental_taintObjectReference } from "react";

type KeyDomain = { [key: string]: DomainLayout };

interface PersistentState {
  domains: KeyDomain;
  setDomain: (key: string, domain: DomainLayout) => void;
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
    }),
    {
      name: "domains",
    }
  )
);
