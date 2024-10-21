import chroma from "chroma-js";
import React from "react";

interface Props {
  colors: chroma.Color[];
  steps: number;
}

export const ColorContainer = ({ colors, steps }: Props) => {
  return (
    <div className="flex">
      {colors.map((c: any) => {
        return (
          <div
            style={{
              background: c,
              width: `${500 / steps}px`,
            }}
            className="h-16"
          />
        );
      })}
    </div>
  );
};
