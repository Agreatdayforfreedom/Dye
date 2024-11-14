import React from "react";
import { Search } from "./Search";
import { Chart } from "./Chart";
import { CheckList } from "./CheckList";
import { TextCard } from "./TextCard";
import { Alert } from "./Alert";

const PreviewSection = () => {
  return (
    <div className="max-w-[95%] sm:max-w-[90%] mx-auto">
      <Search />
      <div className="text-center space-y-4 sm:flex mt-5 space-x-4 justify-between">
        <div className="sm:flex flex-col ">
          <Chart />
        </div>
        <div className="flex flex-col space-y-2">
          <Alert />
          <TextCard />
          <CheckList />
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
