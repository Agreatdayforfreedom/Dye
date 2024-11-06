import { Suspense } from "react";
import { LerpColors } from "./_components/LerpColors";

export default function Home() {
  return (
    <main className="h-full">
      <Suspense fallback="loading...">
        <LerpColors />
      </Suspense>
    </main>
  );
}
