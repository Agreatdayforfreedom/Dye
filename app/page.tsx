import { ProviderWrapper } from "./_components/ProviderWrapper";
import { map_params } from "./_utils/map_params";
import { validate_domain } from "./_utils/validators";
import { Attributes, Params } from "./types";

export default function Home({ searchParams }: { searchParams: Params }) {
  console.log({ searchParams });

  const mapped = map_params(searchParams);

  const domain = validate_domain(mapped.hex, mapped.indices, mapped.stage);
  const attrs: Attributes = {
    name: mapped.name,
    brightness: mapped.brightness,
    hue: mapped.hue,
    saturation: mapped.saturation,
    space: mapped.space,
    stage: mapped.stage,
  };
  return <ProviderWrapper domain={domain} attrs={attrs} />;
}
