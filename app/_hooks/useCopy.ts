import React, { useState } from "react";

export const useCopy = (
  delay: number = 1000
): [boolean, (value: string) => void] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, delay);
  };

  return [isCopied, onCopy];
};
