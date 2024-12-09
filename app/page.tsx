import { Suspense } from "react";
import { ProviderWrapper } from "./_components/ProviderWrapper";
import { map_params, Params } from "./_utils/map_params";
import { validate_domain } from "./_utils/validators";

export default function Home({ searchParams }: { searchParams: Params }) {
  console.log(searchParams);

  const mapped = map_params(searchParams);

  const domain = validate_domain(mapped.hex, mapped.indices, mapped.stage);
  return <ProviderWrapper domain={domain} />;
}
