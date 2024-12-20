import React from "react";
import { Search } from "./Search";
import Chart from "./Chart";
import { CheckList } from "./CheckList";
import { TextCard } from "./TextCard";
import { Alert } from "./Alert";
import { LoginForm } from "./Form";
import { Actions } from "./Actions";
import { useGlobalDyes } from "@/app/store/global_dyes";
import { Separator } from "@radix-ui/react-separator";

const PreviewSection = () => {
  const border_dye = useGlobalDyes((state) => state.l6);

  return (
    <>
      <Separator
        style={{ background: border_dye }}
        className="w-11/12 mx-auto h-px"
        decorative={true}
      />
      <section className="pb-5">
        <h2 className="text-2xl font-semibold mx-4 p-3">Examples</h2>
        <div className="max-w-[95%] sm:max-w-[90%] mx-auto">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Search />
            <Actions />
          </div>
          <div className="gap-4 mt-5 flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col items-center md:items-start md:flex-row gap-4 w-full">
              <Chart />
              <LoginForm />
            </div>
            <div className="flex flex-col justify-between">
              <Alert />
              <div className="flex flex-col sm:flex-row lg:flex-col  gap-5 mt-5 items-center justify-center text-start">
                <TextCard />
                <CheckList />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreviewSection;
