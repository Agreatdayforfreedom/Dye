import React from "react";
import { Search } from "./Search";
import { Chart } from "./Chart";
import { CheckList } from "./CheckList";
import { TextCard } from "./TextCard";

const PreviewSection = () => {
  return (
    <div>
      <Search />
      <div className="flex mt-5 space-x-4">
        <div className="flex flex-col  sm:max-w-[90%]">
          <Chart />
        </div>
        <div className="flex flex-col space-y-2">
          <CheckList />
          <TextCard />
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
