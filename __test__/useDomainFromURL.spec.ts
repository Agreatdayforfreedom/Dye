import { afterEach, expect, Mock, test, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useSearchParams } from "next/navigation";

import { validate_hex, validate_indices } from "@/app/_utils/validators";

import {
  default_domain,
  useDomainFromURL,
} from "@/app/_hooks/useDomainFromURL";
import { default_tw_color_domains } from "../app/constants";
import { DomainLayout } from "../app/types";
import { match } from "assert";

vi.mock("../app/_utils/validators", () => ({
  validate_hex: vi.fn(),
  validate_indices: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

const DEFAULT_PALETTE_DOMAIN = default_domain;
const FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME = "mellow_berry";

const setup = (valid_hex: boolean, valid_indices: boolean, params: string) => {
  (validate_hex as Mock).mockReturnValue(valid_hex);
  (validate_indices as Mock).mockReturnValue(valid_indices);
  (useSearchParams as Mock).mockReturnValue(new URLSearchParams(params));
};

afterEach(() => {
  vi.restoreAllMocks();
});

test("should return default (mellow berry) color palette domain from default_tw_color_domains if the query params are empty", () => {
  setup(false, false, "");

  const { result } = renderHook(() => useDomainFromURL());

  expect(result.current).toEqual({
    hex: default_tw_color_domains[FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME].hex,
    indices:
      default_tw_color_domains[FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME].indices,
  });
});

test("should return default color palette domain if the query params are invalid", () => {
  let cases = [
    "?name=invalid",
    "?p=[]&name=invalid",
    "?p=[]&i=[]&name=invalid",
    "?p=[invalid]&i=[invalid]&name=invalid",
    "?p=[#ffffff, #000000]&i=[0]&name=invalid",
  ];

  for (const c of cases) {
    setup(false, false, c);

    const { result } = renderHook(() => useDomainFromURL());

    expect(result.current).toEqual({
      hex: default_domain.hex,
      indices: default_domain.indices,
    });
  }
});

test("should return the same params if the domain is valid", () => {
  let cases = [
    {
      params: '?p=["#000", "#fff"]&i=[0, 10]',
      match: { hex: ["#000", "#fff"], indices: [0, 10] },
    },
    {
      params: '?p=["#000", "#0f0", "#fff"]&i=[0, 5, 10]',
      match: { hex: ["#000", "#0f0", "#fff"], indices: [0, 5, 10] },
    },
    { params: '?p=["#000"]&i=[1]', match: { hex: ["#000"], indices: [1] } },
    {
      params: '?p=["#000000", "#ff00ff"]&i=[7, 10]',
      match: { hex: ["#000000", "#ff00ff"], indices: [7, 10] },
    },
    {
      // This case validates that if there is a valid domain and a valid name for default_tw_color_domains, the valid domain is returned.
      params: '?p=["#000000", "#ff00ff"]&i=[7, 10]&name=mellow_berry',
      match: { hex: ["#000000", "#ff00ff"], indices: [7, 10] },
    },
  ];

  for (const obj of cases) {
    setup(true, true, obj.params);
    const { result } = renderHook(() => useDomainFromURL());

    expect(result.current).toEqual(obj.match);
  }
});
