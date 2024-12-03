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
import { tw_color_scale } from "@/app/constants";
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
  let saved = domains[name];
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
  let hex_changes = filter_domains(domain, domains[name]);

  let i = stage === "shade" ? 1 : 0;
  let n = stage === "shade" ? domain.hex.length - 1 : domain.hex.length;

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="??" className="border-none mt-2">
        <AccordionTrigger className="p-0 font-bold" decoration={false}>
          See your changes
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            {Object.keys(attr_changes).map((k: string) => {
              let attr = attr_changes[k as keyof Attributes];
              if (attr.saved !== attr.modified) {
                return (
                  <div>
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
                {Object.keys(hex_changes).map((hex: string) => {
                  if (hex_changes[hex] === undefined) return null;

                  const tw_scale = hex;
                  const color_plus = hex_changes[hex]["+"];
                  const color_minus = hex_changes[hex]["-"];
                  if (color_plus !== color_minus)
                    return (
                      <div>
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
