"use client";

import React from "react";

import { useGlobalDyes } from "@/app/store/global_dyes";
import ToggleDarkMode from "./ToggleDarkMode";
import {
  CheckCheck,
  ClipboardCopy,
  SquareCheckBig,
  SquareCheckBigIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCopy } from "@/app/_hooks/useCopy";
import Link from "next/link";

export const Header = () => {
  const [isCopied, onCopy] = useCopy(3000);

  const l10 = useGlobalDyes((state) => state.l10);
  const l8 = useGlobalDyes((state) => state.l8);
  const l5 = useGlobalDyes((state) => state.l5);

  return (
    <header className="h-12 w-full border-b" style={{ borderColor: l10 }}>
      <div className="h-full w-11/12 flex items-center justify-between mx-auto">
        <div className="flex space-x-2 items-end">
          <h1 style={{ color: l5 }} className="text-2xl font-bold">
            Dye
          </h1>
          <p className="text-sm font-semibold" style={{ color: l8 }}>
            Palette Generator
          </p>
        </div>
        <div className="flex space-x-2 sm:space-x-5">
          <div className="space-x-3 flex items-center">
            <Link href="https://github.com/Agreatdayforfreedom/Dye">
              <svg
                width={18}
                height={18}
                role="img"
                viewBox="0 0 24 24"
                className="fill-foreground hover:opacity-75 transition-opacity"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>

            {isCopied ? (
              <CheckCheck className="stroke-green-500" size={18} />
            ) : (
              <button
                className="hover:opacity-75"
                onClick={() => onCopy(window.location.toString())}
              >
                <ClipboardCopy size={18} />
              </button>
            )}
            {/* TODO: CHANGE MODE!!! */}
          </div>
          <Separator
            decorative
            orientation="vertical"
            className="h-8"
            style={{ background: l10 }}
          />
          <ToggleDarkMode />
        </div>
      </div>
    </header>
  );
};
