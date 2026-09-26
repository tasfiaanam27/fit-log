import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status}`);
  }

  return response.json();
};

const WorkoutLibrary = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="mb-8">
        <h2 className="font-oswald text-[30px] font-bold uppercase leading-tight text-white">
          THE LIBRARY
        </h2>

        <p className="mt-1 font-inter text-[14px] font-normal text-[#8f949e]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutLibrary;