import chroma from "chroma-js";
import React, { PropsWithChildren, useState } from "react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { cn } from "@/lib/utils";

const boxes: { label: string; checked: boolean }[] = [
  { label: "Add alpha background color", checked: true },
  { label: "Add gl format", checked: false },
  { label: "Add more global dyes", checked: true },
  { label: "Create a logo for the web", checked: false },
  { label: "Add custom check boxes", checked: false },
];

export const CheckList = () => {
  const c1 = useGlobalDyes((state) => state.l6);
  const c2 = useGlobalDyes((state) => state.l8);
  return (
    <div
      style={{
        backgroundColor: chroma(c1).alpha(0.5).hex(),
        "--primary": c2,
      }}
      className="space-y-2 w-full xs:max-w-[300px] border p-5 pt-3 rounded h-fit relative before:content-[''] before:absolute before:w-16 before:h-12 before:bg-[var(--primary)] before:top-0 before:right-0 corner_triangle_path"
    >
      <h1 className="font-bold">Todo List</h1>
      {boxes.map(({ label, checked }) => (
        <CheckBoxWithLabel key={label} checked={checked}>
          {label}
        </CheckBoxWithLabel>
      ))}
    </div>
  );
};

interface Props extends PropsWithChildren {
  checked: boolean;
}
const CheckBoxWithLabel = ({ children, checked }: Props) => {
  const [toggle, setToggle] = useState(checked);
  const c1 = useGlobalDyes((state) => state.l7);

  return (
    <div className="flex gap-1">
      <Checkbox
        checked={toggle}
        onCheckedChange={() => setToggle(!toggle)}
        style={{
          "--primary": c1,
          "--secondary": chroma(c1).alpha(0.5).hex(),
        }}
        className="data-[state=checked]:bg-[var(--color)] data-[state=checked]:border-[var(--color)]"
      />
      <Label
        style={{ "--primary": c1 }}
        className={cn(
          "font-semibold",
          toggle ? "line-through decoration-[var(--primary)]" : ""
        )}
      >
        {children}
      </Label>
    </div>
  );
};
