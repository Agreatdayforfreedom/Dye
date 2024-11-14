import React, { PropsWithChildren, useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGlobalDyes } from "@/app/store/global_dyes";
import chroma from "chroma-js";
import { cn } from "@/lib/utils";

const boxes: { label: string; checked: boolean }[] = [
  { label: "Add alpha background color", checked: true },
  { label: "Add gl format", checked: false },
  { label: "Add more global dyes", checked: true },
  { label: "Create a logo for the web", checked: false },
  { label: "Add custom check boxes", checked: false },
];

export const CheckList = () => {
  const c2 = useGlobalDyes((state) => state.border_dye);
  const c3 = useGlobalDyes((state) => state.title_dye);

  return (
    <div
      style={{
        backgroundColor: chroma(c2).alpha(0.5).hex(),
        "--before-color": c3,
      }}
      className="space-y-2 max-w-[300px] border p-5 pt-3 rounded h-fit relative before:content-[''] before:absolute before:w-16 before:h-12 before:bg-[var(--before-color)] before:top-0 before:right-0 corner_triangle_path"
    >
      <h1 className="font-bold">Todo List</h1>
      {boxes.map(({ label, checked }) => (
        <CheckBoxWithLabel checked={checked}>{label}</CheckBoxWithLabel>
      ))}
    </div>
  );
};

interface Props extends PropsWithChildren {
  checked: boolean;
}
const CheckBoxWithLabel = ({ children, checked }: Props) => {
  const [toggle, setToggle] = useState(checked);
  const c1 = useGlobalDyes((state) => state.bg_dye);
  // const c2 = useGlobalDyes((state) => state.border_shadow_dye);

  return (
    <div className="flex gap-1">
      <Checkbox
        checked={toggle}
        onCheckedChange={() => setToggle(!toggle)}
        style={{ "--color": c1, "--color-border": chroma(c1).alpha(0.5) }}
        className="data-[state=checked]:bg-[var(--color)] data-[state=checked]:border-[var(--color)]"
      />
      <Label
        style={{ "--color": c1 }}
        className={cn(
          "font-semibold",
          toggle ? "line-through decoration-[var(--color)]" : ""
        )}
      >
        {children}
      </Label>
    </div>
  );
};
