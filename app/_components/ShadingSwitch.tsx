import React from "react";
import { Switch } from "@/components/ui/switch";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { usePointers } from "@/app/store/pointers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ShadingSwitch = () => {
  const setStage = usePointers((state) => state.setStage);
  const stage = usePointers((state) => state.stage);
  const l5 = useGlobalDyes((state) => state.l5);
  const l10 = useGlobalDyes((state) => state.l10);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  function onClick() {
    setStage((state) => {
      params.set("stage", state.stage);
    }); //FIXME

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center space-x-2 mx-2 justify-center">
      <span className="text-sm font-semibold">Free</span>
      <Switch
        checked={stage === "shade" ? true : false}
        style={{
          "--primary": l5,
          "--secondary": l10,
        }}
        className="
        data-[state=checked]:bg-[var(--secondary)]
        data-[state=unchecked]:bg-[var(--primary)]
        bg-[var(--primary)]
      "
        onClick={onClick}
      />
      <span className="text-sm font-semibold">500 Shade</span>
    </div>
  );
};
