import { Bell, Bird, Copy, Image, Share, Smile, Squirrel } from "lucide-react";
import React from "react";
import { useGlobalDyes } from "@/app/store/global_dyes";
import chroma from "chroma-js";

export const Actions = () => {
  const l2 = useGlobalDyes((state) => state.l2);
  const l2a = chroma(l2).alpha(0.5);
  return (
    <div className="flex items-center">
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Share size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Image size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Copy size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Smile size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Bell size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Squirrel size={18} />
      </div>
      <div
        style={{ "--hover-bg": l2, "--hover-bg-active": l2a }}
        className="p-2 active:bg-[var(--hover-bg-active)] cursor-pointer rounded-full hover:bg-[var(--hover-bg)]"
      >
        <Bird size={18} />
      </div>
    </div>
  );
};
