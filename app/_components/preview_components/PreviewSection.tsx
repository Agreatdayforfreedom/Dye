import React from "react";
import { Search } from "./Search";
import { Chart } from "./Chart";
import { CheckList } from "./CheckList";
import { TextCard } from "./TextCard";
import { Alert } from "./Alert";
import { LoginForm } from "./Form";

const PreviewSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mx-4 p-3">Examples</h2>
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto">
        <Search />
        <div className="text-center space-y-4 sm:flex mt-5 space-x-4 justify-between">
          <div className="sm:flex flex-col ">
            <Chart />
          </div>
          <LoginForm />
          <div className="flex flex-col space-y-2">
            <Alert />
            <TextCard />
            <CheckList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
