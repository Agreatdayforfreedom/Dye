import { useSearchParams, usePathname } from "next/navigation";
import React from "react";

export function useThrottleSearchParams(
  key: string[],
  value: string[],
  interval = 500
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  React.useEffect(() => {
    const id = setTimeout(() => {
      let i = 0;
      while (i < key.length) {
        if (key[i] && value[i]) params.set(key[i], value[i]);
        i++;
      }
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    }, interval);

    return () => clearTimeout(id);
  }, [JSON.stringify(value)]);
}
