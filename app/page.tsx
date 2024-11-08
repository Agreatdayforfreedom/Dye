import { Suspense } from "react";
import { ProviderWrapper } from "./_components/ProviderWrapper";

export default function Home() {
  return (
    <main className="h-full">
      <Suspense fallback="loading...">
        <ProviderWrapper />
      </Suspense>
    </main>
  );
}
