import React from "react";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { AlertCircle, AlertOctagonIcon } from "lucide-react";
import { getContrastYIQ } from "../../_utils/yiq";

export const Alert = () => {
  const c1 = useGlobalDyes((state) => state.l9);

  return (
    <div
      style={{ background: c1 }}
      className="h-12 rounded  flex items-center space-x-2 px-2"
    >
      <AlertOctagonIcon style={{ stroke: getContrastYIQ(c1) }} />
      <span className="font-bold" style={{ color: getContrastYIQ(c1) }}>
        Alert
      </span>
    </div>
  );
};
