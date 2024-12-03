import { test, expect } from "vitest";
import { filter_domains } from "@/app/_utils/filter_domains";

test("should filter by hexadecimal if they are different or one is undefined", () => {
  const cases = [
    {
      a: {
        indices: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10],
        hex: [
          "#ff7300",
          "#ff6f00",
          "#ff6600",
          "#ff5900",
          "#ff3c00",
          "#ff6600",
          "#ffd500",
          "#ffe100",
          "#fffb00",
          "#009dff",
        ],
      },
      b: {
        hex: [
          "#ff7300",
          "#ff6f00",
          "#ff6600",
          "#ff5900",
          "#ff3c00",
          "#ff4d00",
          "#ff6600",
          "#ffd500",
          "#ffe100",
          "#fffb00",
          "#009dff",
        ],
        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      match: {
        "500": {
          "+": undefined,
          "-": "#ff4d00",
        },
      },
    },
    {
      a: {
        hex: ["#ff0000"],
        indices: [5],
      },
      b: {
        hex: ["#00ff00"],
        indices: [5],
      },
      match: {
        "500": {
          "+": "#ff0000",
          "-": "#00ff00",
        },
      },
    },
    {
      a: {
        hex: ["#ff0000", "#000000"],
        indices: [2, 7],
      },
      b: {
        hex: ["#00ff00"],
        indices: [2],
      },
      match: {
        "200": {
          "+": "#ff0000",
          "-": "#00ff00",
        },
        "700": {
          "+": "#000000",
          "-": undefined,
        },
      },
    },
    {
      a: {
        hex: ["#00ff00"],
        indices: [2],
      },
      b: {
        hex: ["#ff0000", "#000000"],
        indices: [2, 7],
      },
      match: {
        "200": {
          "+": "#00ff00",
          "-": "#ff0000",
        },
        "700": {
          "+": undefined,
          "-": "#000000",
        },
      },
    },
  ];

  for (const { a, b, match } of cases)
    expect(filter_domains(a, b)).toEqual(match);
});

test("should return an empty object if both domains are identical", () => {
  const cases = [
    {
      a: {
        hex: [],
        indices: [],
      },
      b: {
        hex: [],
        indices: [],
      },
      match: {},
    },
    {
      a: {
        hex: ["#123123"],
        indices: [5],
      },
      b: {
        hex: ["#123123"],
        indices: [5],
      },
      match: {},
    },
    {
      a: {
        hex: ["#123123", "#123123"],
        indices: [5, 6],
      },
      b: {
        hex: ["#123123", "#123123"],
        indices: [5, 6],
      },
      match: {},
    },
  ];
  for (const { a, b, match } of cases)
    expect(filter_domains(a, b)).toEqual(match);
});
