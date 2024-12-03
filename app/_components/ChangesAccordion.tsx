import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { usePointers, usePointersDomain } from "@/app/store/pointers";
import { useVariables } from "@/app/store/variables";
import { usePersistentStore } from "@/app/store/persistent_domain";
import { Attributes } from "@/app/types";
import { filter_domains } from "../_utils/filter_domains";

type Changes = {
  [key in keyof Attributes]: { saved: string; modified: string };
};

export const ChangesAccordion = () => {
  const { domains } = usePersistentStore();

  const name = useVariables((state) => state.name);
  const domain = usePointersDomain();
  const stage = usePointers((state) => state.stage);

  const brightness = useVariables((state) => state.brightness);
  const hue = useVariables((state) => state.hue);
  const saturation = useVariables((state) => state.saturation);
  const colorSpace = useVariables((state) => state.colorSpace);
  const saved = domains[name];
  const attr_changes: Changes = {
    hue: {
      modified: hue.toString(),
      saved: saved.hue.toString(),
    },
    brightness: {
      modified: brightness.toString(),
      saved: saved.brightness.toString(),
    },
    saturation: {
      modified: saturation.toString(),
      saved: saved.saturation.toString(),
    },
    space: {
      modified: colorSpace,
      saved: saved.space,
    },
    stage: {
      modified: stage,
      saved: saved.stage,
    },
  };
  const hex_changes = filter_domains(domain, domains[name]);

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="??" className="border-none mt-2">
        <AccordionTrigger className="p-0 font-bold" decoration={false}>
          See your changes
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            {Object.keys(attr_changes).map((k: string) => {
              const attr = attr_changes[k as keyof Attributes];
              if (attr.saved !== attr.modified) {
                return (
                  <div key={k}>
                    <span>{k}:</span>
                    <span className="font-bold text-red-600">{attr.saved}</span>
                    <span className="font-bold text-xs mx-1 tracking-tighter">
                      ..
                    </span>
                    <span className="font-bold text-green-600">
                      {attr.modified}
                    </span>
                  </div>
                );
              }
            })}
            <span className="flex flex-col">
              colors: [
              <span className="flex flex-col mx-4">
                {Object.keys(hex_changes).map((hex: string, i: number) => {
                  if (hex_changes[hex] === undefined) return null;

                  const tw_scale = hex;
                  let color_plus = hex_changes[hex]["+"];
                  const color_minus = hex_changes[hex]["-"];

                  // we mark as deleted insead of replaced the 50 and 950 scale because in the UI it isn't replaced, is deleted, i mean, we add the pointers default 0, 10 but in the UI they does not appears if it's in shade stage.
                  const shade_condition =
                    stage === "shade" &&
                    (tw_scale === "50" || tw_scale === "950");
                  if (shade_condition) {
                    color_plus = undefined;
                  }
                  if (color_plus !== color_minus)
                    return (
                      <div key={i}>
                        {color_plus !== undefined ? (
                          <div>
                            <span className="font-bold text-green-500 ">+</span>
                            <span>
                              {tw_scale}: {color_plus},
                            </span>
                          </div>
                        ) : null}
                        {/* prev */}
                        {color_minus !== undefined ? (
                          <div>
                            <span className="font-bold text-red-500 ">-</span>
                            <span
                              className={cn(
                                !color_plus ? "line-through opacity-75" : ""
                              )}
                            >
                              {tw_scale}: {color_minus},
                            </span>
                          </div>
                        ) : null}
                      </div>
                    );
                })}
              </span>
              ]
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
