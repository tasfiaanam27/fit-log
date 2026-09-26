import { Suspense } from "react";

import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

const LibraryLoading = () => {
  return (
    <div className="mx-auto flex min-h-[300px] w-full max-w-[1280px] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2a2e35] border-t-[#C2F800]" />

        <p className="font-inter text-sm text-[#8f949e]">
          Loading workouts...
        </p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">

      <Hero />

      <Suspense fallback={<LibraryLoading />}>
        <WorkoutLibrary />
      </Suspense>

    </main>
  );
};

export default HomePage;