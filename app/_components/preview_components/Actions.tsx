import { Bell, Bird, Copy, Image, Share, Smile, Squirrel } from "lucide-react";
import React from "react";
import { useGlobalDyes } from "@/app/store/global_dyes";
import chroma from "chroma-js";

export const Actions = () => {
  const l2 = useGlobalDyes((state) => state.l2);
  const l2a = chroma(l2).alpha(0.5).hex();
  return (
    <div className="flex items-center">
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Share size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Image size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Copy size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Smile size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Bell size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Squirrel size={18} />
      </div>
      <div
        style={{ "--primary": l2, "--secondary": l2a }}
        className="p-2 active:bg-[var(--secondary)] cursor-pointer rounded-full hover:bg-[var(--primary)]"
      >
        <Bird size={18} />
      </div>
    </div>
  );
};
