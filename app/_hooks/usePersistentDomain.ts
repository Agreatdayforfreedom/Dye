import { useEffect, useState } from "react";
import { DomainLayout } from "../types";
import { getItem, setItem } from "../_utils/localStorage";

type KeyDomain = { [key: string]: DomainLayout };

type Return = {
  domains: KeyDomain | undefined;
  set: (key: string, domain: DomainLayout) => void;
};

export const usePersistentDomain = (): Return => {
  const [domains, setDomains] = useState(() => {
    const _domains = getItem("domains");
    if (_domains) {
      return _domains;
    }
    return {};
  });

  useEffect(() => {
    setItem("domains", domains);
    console.log(domains);
  }, [domains]);

  function set(key: string, domain: DomainLayout) {
    setDomains((prev: KeyDomain) => ({ ...prev, [key]: domain }));
  }

  return { domains, set };
};

function pair_exists(key: string, domain: DomainLayout) {}
