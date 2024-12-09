import { expect, Mock, test, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useSearchParams } from "next/navigation";

import { useDomainFromURL } from "@/app/_hooks/useDomainFromURL";
import { default_domain, default_tw_color_domains } from "@/app/constants";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

const FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME = "mellow_berry";

const setup = (params: string) => {
  (useSearchParams as Mock).mockReturnValue(new URLSearchParams(params));
};

test("should return default (mellow berry) color palette domain from default_tw_color_domains if the query params are invalid", () => {
  let cases = ["?p=[]&i=[]", "?p=[]", "?p", "?i=[]", "kkkkkkkkkkkkkkk"];

  for (const test of cases) {
    setup(test);

    const { result } = renderHook(() => useDomainFromURL());

    expect(result.current).toEqual({
      hex: default_tw_color_domains[FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME].hex,
      indices:
        default_tw_color_domains[FROM_TW_DEFAULT_PALETTE_DOMAIN_NAME].indices,
    });
  }
});

test("should return default color palette domain if the query params are invalid and the name is present but does not match with existing domain in [default_tw_color_domains]", () => {
  let cases = [
    "?name=invalid",
    "?p=[]&name=invalid",
    "?p=[]&i=[]&name=invalid",
    "?p=[invalid]&i=[invalid]&name=invalid",
    "?p=[#ffffff, #000000]&i=[0]&name=invalid",
  ];

  for (const c of cases) {
    setup(c);

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
      params: '?p=["#000"]&i=[10]',
      match: { hex: ["#000"], indices: [10] },
    },
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
    setup(obj.params);
    const { result } = renderHook(() => useDomainFromURL());

    expect(result.current).toEqual(obj.match);
  }
});

test("should return the shade domain if the query params stage=shade is present", () => {
  const cases = [
    {
      params: '?p=["#ffffff","#ff0000", "#000000"]&i=[0, 5, 10]&stage=shade',
      match: { hex: ["#ffffff", "#ff0000", "#000000"], indices: [0, 5, 10] },
    },

    {
      params:
        '?p=["#ffffff","#ff0000", "#000000"]&i=[0, 5, 10]&stage=shade&name=mellow_berry',
      match: { hex: ["#ffffff", "#ff0000", "#000000"], indices: [0, 5, 10] },
    },
    {
      params: "?stage=shade",
      match: { hex: ["#00ffff"], indices: [5] },
    },
    {
      params: '?p=["#ffff000000"]&i=[0, 5, 10]&stage=shade&name=mellow_berry',
      match: { hex: ["#00ffff"], indices: [5] },
    },
    {
      params: '?p=["#ffff0 10]&stage=shade&name=mellow_berry',
      match: { hex: ["#00ffff"], indices: [5] },
    },
    {
      params: "?stage=shade&p=[%22%23f2ffff%22%2+berry&i=[0%2C5%2C10]",
      match: { hex: ["#00ffff"], indices: [5] },
    },
    {
      params: "?stage=shade&p=[#ffffff]&i=[0]",
      match: { hex: ["#00ffff"], indices: [5] },
    },
  ];

  for (const test of cases) {
    setup(test.params);

    const { result } = renderHook(() => useDomainFromURL());
    expect(result.current).toEqual(test.match);
  }
});
