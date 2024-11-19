import { expect, test } from "vitest";
import { order_by_luminance } from "@/app/_utils/order_by_luminance";

test("if all colors are identical, they should remain in the same order", () => {
  let colors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
  ];
  let ordered = order_by_luminance(colors);

  expect(ordered).toEqual(colors);
});

test("if lenght is 1, the hex color is returned", () => {
  let colors = ["#cccccc"];
  let ordered = order_by_luminance(colors);

  expect(ordered).toEqual(colors);
});

test("it should sort the colors by luminance even though there are duplicates.", () => {
  let colors = ["#ffffff", "#ff0000", "#ff0000", "#ffffff", "#000000"];

  let ordered = order_by_luminance(colors);
  expect(ordered).toEqual([
    "#ffffff",
    "#ffffff",
    "#ff0000",
    "#ff0000",
    "#000000",
  ]);
});

test("it should sort the colors by luminance.", () => {
  let colors = ["#ffff00", "#ff0000", "#ffffff", "#000000"];

  let ordered = order_by_luminance(colors);
  expect(ordered).toEqual(["#ffffff", "#ffff00", "#ff0000", "#000000"]);
});
