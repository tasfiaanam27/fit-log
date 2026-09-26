import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#242830] bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#C2F800]/50"
    >
      <div className="relative h-[190px] w-full overflow-hidden sm:h-[205px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">

        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#C2F800] px-[10px] py-[2px] font-inter text-[11px] font-bold uppercase leading-[17px] text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="font-oswald text-[18px] font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-1 font-inter text-[12px] font-normal text-[#8f949e]">
          {workout.equipment}
        </p>

        <div className="my-4 h-px w-full bg-[#242830]" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-inter text-[12px] font-normal text-[#8f949e]">
          <div className="flex items-center gap-1.5">
            <Clock3 size={15} strokeWidth={1.7} />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame
              size={14}
              strokeWidth={0}
              fill="currentColor"
            />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star size={15} strokeWidth={1.7} />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;