import React from "react";
import { useGlobalDyes } from "../../store/global_dyes";

export const TextCard = () => {
  const c1 = useGlobalDyes((state) => state.border_dye);
  const c2 = useGlobalDyes((state) => state.text_dye);

  return (
    <div
      style={{ borderColor: c1 }}
      className="border-l-[3px] pink-400 max-w-72 text-sm text-balance leading-tight p-2"
    >
      Lorem, ipsum dolor sit amet consectetur{" "}
      <span className="font-semibold" style={{ color: c2 }}>
        adipisicing
      </span>{" "}
      elit. Animi incidunt maiores impedit{" "}
      <span className="font-semibold" style={{ color: c2 }}>
        corporis
      </span>{" "}
      aspernatur, explicabo error qui sapiente quisquam
    </div>
  );
};
