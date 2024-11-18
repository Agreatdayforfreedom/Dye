import { expect, test } from "vitest";
import { validate_hex, validate_indices } from "@/app/_utils/validators";

test("validate_hex() should return false if the array is empty", () => {
  let hexs: string[] = [];
  let is_valid = validate_hex(hexs);
  expect(is_valid).toBe(false);
});

test("validate_hex() should return false if at least 1 hexadecimal color is invalid", () => {
  let hexs = ["#111111", "#f00", "ff0000", "INVALID"];
  let is_valid = validate_hex(hexs);
  expect(is_valid).toBe(false);
});

test("validate_hex() should return true if all the hexadecimal color are valid", () => {
  let hexs = ["#111111", "#f00", "ff0000"];
  let is_valid = validate_hex(hexs);
  expect(is_valid).toBe(true);
});

test("validate_indices() should return true if the next indice is grater than the previous one", () => {
  let indices = [1, 2, 3, 4, 5];
  let is_valid = validate_indices(indices);
  expect(is_valid).toBe(true);
});

test("validate_indices() should return false if the next indice is less than or equal (or invalid) to the previous one", () => {
  let tests: any[][] = [
    [1, 2, 3, 3, 4, 3, 5],
    [0],
    ["asd"],
    [1, 1, 1],
    [0, 1],
    [undefined],
    [null],
  ];
  for (const indices of tests) {
    let is_valid = validate_indices(indices);
    expect(is_valid).toBe(false);
  }
});
