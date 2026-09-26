"use client";

import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";
import { useToast } from "@/context/ToastContext";

type WorkoutActionsProps = {
  workout: Workout;
};

const WorkoutActions = ({
  workout,
}: WorkoutActionsProps) => {
  const {
    addToPlan,
    removeFromPlan,
    saveWorkout,
    removeSavedWorkout,
    isInPlan,
    isSaved,
  } = useWorkout();

  const { showToast } = useToast();

  const addedToPlan = isInPlan(workout.id);
  const savedForLater = isSaved(workout.id);

  const handlePlan = () => {
    if (addedToPlan) {
      removeFromPlan(workout.id);
      showToast("Removed from today's plan");
    } else {
      addToPlan(workout);
      showToast("Added to today's plan");
    }
  };

  const handleSave = () => {
    if (savedForLater) {
      removeSavedWorkout(workout.id);
      showToast("Removed from saved workouts");
    } else {
      saveWorkout(workout);
      showToast("Saved for later");
    }
  };

  return (
    <div className="mt-9 flex flex-wrap gap-4">

      <button
        type="button"
        onClick={handlePlan}
        className={`flex h-[44px] items-center gap-2 rounded-xl px-6 font-inter text-[14px] font-semibold transition ${
          addedToPlan
            ? "bg-[#252a33] text-[#C2F800]"
            : "bg-[#C2F800] text-black hover:bg-[#d0ff28]"
        }`}
      >
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
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
          />

          <path d="M16 3v4M8 3v4M3 10h18" />

          {addedToPlan ? (
            <path d="m9 15 2 2 4-4" />
          ) : (
            <path d="M12 13v5M9.5 15.5h5" />
          )}
        </svg>

        {addedToPlan
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        className={`flex h-[44px] items-center gap-2 rounded-xl border px-6 font-inter text-[14px] font-medium transition ${
          savedForLater
            ? "border-[#C2F800] bg-[#C2F800]/10 text-[#C2F800]"
            : "border-[#343a45] text-[#e1e3e7] hover:border-[#555d69] hover:bg-[#15181e]"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={savedForLater ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[17px] w-[17px]"
          aria-hidden="true"
        >
          <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
        </svg>

        {savedForLater
          ? "Saved"
          : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;