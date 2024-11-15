import { Suspense } from "react";
import { ProviderWrapper } from "./_components/ProviderWrapper";

export default function Home() {
  return (
    <Suspense fallback="loading...">
      <ProviderWrapper />
    </Suspense>
  );
}
