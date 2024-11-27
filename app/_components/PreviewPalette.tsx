import chroma from "chroma-js";

import { DomainLayout } from "@/app/types";
import { usePointers } from "@/app/store/pointers";
import { useVariables } from "@/app/store/variables";
import { lerp_colors } from "@/app/_utils/lerp_colors";
import { Attributes } from "@/app/types";

interface Props {
  name: string;
  domain: DomainLayout;
  attrs?: Attributes;
}

export const PreviewPalette = ({ name, domain, attrs }: Props) => {
  const colors = lerp_colors(
    domain,
    attrs?.space || "rgb",
    attrs?.hue || 0,
    attrs?.brightness || 0,
    attrs?.saturation || 0,
    11
  );
  return (
    <div className="w-500 flex cursor-pointer hover:scale-105 transition-transform">
      {colors.map((c, index) => (
        <div
          key={index}
          className="h-8 w-6"
          style={{ background: c.hex() }}
        ></div>
      ))}
    </div>
  );
};
