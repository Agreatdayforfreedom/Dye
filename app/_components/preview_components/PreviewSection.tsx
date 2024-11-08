import React from "react";
import { Search } from "./Search";
import { Chart } from "./Chart";

const PreviewSection = () => {
  return (
    <div className="flex sm:max-w-[90%] mx-auto mt-5">
      <Search />
      <Chart />
    </div>
  );
};

export default PreviewSection;
