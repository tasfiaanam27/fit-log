import Image from "next/image";
import { Workout } from "@/types/workout";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <main className="min-h-screen bg-[#0b0d10] text-white">

      <section className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[588px_1fr] lg:gap-14">
          
          {/* LEFT IMAGE */}
          <div className="relative w-full overflow-hidden rounded-2xl lg:h-[735px]">
            <div className="relative aspect-[588/735] w-full lg:h-full">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 588px"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col">
            
            {/* TITLE */}
            <h1 className="font-oswald text-[36px] font-bold uppercase leading-[1.15]">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 max-w-[570px] font-inter text-[16px] font-normal leading-6 text-[#9297a1]">
              {workout.description}
            </p>

            {/* MUSCLE GROUPS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#C2F800] px-[12px] py-[3px] font-inter text-[12px] font-semibold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* INFORMATION TABLE */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-[#252a33] bg-[#15181e]">
              <DetailRow label="Equipment" value={workout.equipment} />
              <DetailRow label="Difficulty" value={workout.difficulty} />
              <DetailRow label="Sets" value={String(workout.sets)} />
              <DetailRow label="Reps" value={workout.reps} />
              <DetailRow
                label="Duration"
                value={`${workout.duration} min`}
              />
              <DetailRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />
              <DetailRow
                label="Rating"
                value={String(workout.rating)}
                last
              />
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-8">
              <h2 className="font-inter text-[16px] font-extrabold uppercase">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 font-inter text-[14px] font-normal leading-5 text-[#c1c4ca]"
                  >
                    <span className="shrink-0 text-[#9297a1]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                className="flex h-[44px] items-center gap-2 rounded-xl bg-[#C2F800] px-6 font-inter text-[14px] font-semibold text-black transition hover:bg-[#d0ff28]"
              >
                {/* Calendar + icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                  <path d="M12 13v5M9.5 15.5h5" />
                </svg>

                Add to today&apos;s plan
              </button>

              <button
                type="button"
                className="flex h-[44px] items-center gap-2 rounded-xl border border-[#343a45] px-6 font-inter text-[14px] font-medium text-[#e1e3e7] transition hover:border-[#555d69] hover:bg-[#15181e]"
              >
                {/* Bookmark */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                >
                  <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
                </svg>

                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

type DetailRowProps = {
  label: string;
  value: string;
  last?: boolean;
};

const DetailRow = ({
  label,
  value,
  last = false,
}: DetailRowProps) => {
  return (
    <div
      className={`flex min-h-[53px] items-center justify-between gap-5 px-6 ${
        !last ? "border-b border-[#252a33]" : ""
      }`}
    >
      <span className="font-inter text-[12px] font-bold uppercase text-[#9297a1]">
        {label}
      </span>

      <span className="text-right font-inter text-[14px] font-medium text-[#f1f2f4]">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetailsPage;