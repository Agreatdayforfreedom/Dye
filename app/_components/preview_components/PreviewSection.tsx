import React from "react";
import { Search } from "./Search";
import { Chart } from "./Chart";
import { CheckList } from "./CheckList";

const PreviewSection = () => {
  return (
    <div className="flex">
      <div className="flex flex-col space-y-5 sm:max-w-[90%]  mt-5">
        <Search />
        <Chart />
      </div>
      <CheckList />
    </div>
  );
};

export default PreviewSection;
