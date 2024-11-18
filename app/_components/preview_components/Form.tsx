import React from "react";
import chroma from "chroma-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalDyes } from "@/app/store/global_dyes";

export const LoginForm = () => {
  const l11 = useGlobalDyes((state) => state.l11);
  const l2 = useGlobalDyes((state) => state.l2);
  const l6 = useGlobalDyes((state) => state.l6);
  const l8 = useGlobalDyes((state) => state.l8);
  return (
    <div
      style={{
        "--before-color-l": l2,
        "--before-color-r": l8,
      }}
      className="flex-1 w-[90%] sm:w-[50%]  h-full flex flex-col justify-between border rounded p-4 relative form_preview_decoration before:bg-gradient-to-r before:from-[var(--before-color-l)] before:to-[var(--before-color-r)] "
    >
      <header className="mb-5 pb-5 pt-3">
        <h2 className="font-bold text-3xl">Login</h2>
      </header>
      <div className=" space-y-4">
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-bold">Username</Label>
          <Input
            type="text"
            placeholder="John doe"
            style={
              l11
                ? {
                    outline: 0,
                    boxShadow: `0px 0px 0px 2px ${chroma(l11)
                      .alpha(0.4)
                      .hex()}`,
                    borderColor: l11,
                  }
                : {}
            }
          />
        </div>
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-bold">Password</Label>
          <Input
            type="password"
            placeholder="********"
            style={
              l11
                ? {
                    outline: 0,
                    boxShadow: `0px 0px 0px 2px ${chroma(l11)
                      .alpha(0.4)
                      .hex()}`,
                    borderColor: l11,
                  }
                : {}
            }
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <Button
            className="rounded-none w-full md:w-[124px]"
            style={{ background: l6 }}
          >
            Log in
          </Button>
          <span className="hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};
