"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { useToast } from "@/context/ToastContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSavedWorkout,
    } = useWorkout();

    const { showToast } = useToast();

    const [activeTab, setActiveTab] = useState<Tab>("plan");
    const [sortBy, setSortBy] = useState<SortOption>("duration");
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    const currentWorkouts = activeTab === "plan" ? plan : saved;

    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return b.caloriesBurned - a.caloriesBurned;
        }

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    const toggleCompleted = (id: number) => {
        const alreadyCompleted = completedIds.includes(id);

        setCompletedIds((current) =>
            alreadyCompleted
                ? current.filter((workoutId) => workoutId !== id)
                : [...current, id]
        );

        if (alreadyCompleted) {
            showToast("Workout marked as not done");
        } else {
            showToast("Workout marked as done");
        }
    };

    const handleRemove = (id: number) => {
        if (activeTab === "plan") {
            removeFromPlan(id);
            showToast("Workout removed from today's plan");
        } else {
            removeSavedWorkout(id);
            showToast("Workout removed from saved workouts");
        }
    };

    return (
        <main className="bg-[#0b0d10] text-white">
            <section className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 lg:px-12">

                {/* =========================
            PAGE TITLE
        ========================== */}
                <div>
                    <h1 className="font-oswald text-[30px] font-bold uppercase leading-none">
                        My Plan
                    </h1>

                    <p className="mt-3 font-inter text-[12px] text-[#7f848d]">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* =========================
            SUMMARY
        ========================== */}
                <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#252a33] bg-[#15181e]">

                    <div className="relative px-6 py-6">
                        <p className="font-inter text-[10px] text-[#777d87]">
                            Exercises
                        </p>

                        <p className="mt-1 font-oswald text-[28px] font-bold leading-none text-[#C2F800]">
                            {plan.length}
                        </p>

                        <div className="absolute bottom-5 right-0 top-5 w-px bg-[#252a33]" />
                    </div>

                    <div className="relative px-6 py-6">
                        <p className="font-inter text-[10px] text-[#777d87]">
                            Minutes
                        </p>

                        <p className="mt-1 font-oswald text-[28px] font-bold leading-none">
                            {totalMinutes}
                        </p>

                        <div className="absolute bottom-5 right-0 top-5 w-px bg-[#252a33]" />
                    </div>

                    <div className="px-6 py-6">
                        <p className="font-inter text-[10px] text-[#777d87]">
                            Calories
                        </p>

                        <p className="mt-1 font-oswald text-[28px] font-bold leading-none">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* =========================
            TABS + SORT
        ========================== */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

                    {/* Tabs */}
                    <div className="flex rounded-xl border border-[#252a33] bg-[#15181e] p-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab("plan")}
                            className={`rounded-lg px-5 py-2 font-inter text-[11px] transition ${activeTab === "plan"
                                ? "bg-[#292e38] font-semibold text-white"
                                : "text-[#777d87] hover:text-white"
                                }`}
                        >
                            Today&apos;s Plan
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("saved")}
                            className={`rounded-lg px-5 py-2 font-inter text-[11px] transition ${activeTab === "saved"
                                ? "bg-[#292e38] font-semibold text-white"
                                : "text-[#777d87] hover:text-white"
                                }`}
                        >
                            Saved
                        </button>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-3">
                        <span className="font-inter text-[10px] text-[#777d87]">
                            Sort By
                        </span>

                        <select
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value as SortOption)
                            }
                            className="rounded-lg border border-[#252a33] bg-[#15181e] px-3 py-2 font-inter text-[11px] text-[#d4d6da] outline-none"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                {/* =========================
            EMPTY STATE
        ========================== */}
                {sortedWorkouts.length === 0 ? (
                    <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#252a33] text-center">
                        <h2 className="font-oswald text-[18px] font-bold uppercase">
                            Nothing Here Yet
                        </h2>

                        <p className="mt-2 font-inter text-[11px] text-[#777d87]">
                            {activeTab === "plan"
                                ? "Browse the library and add a lift to get today moving."
                                : "Save workouts from the library to find them here later."}
                        </p>

                        <Link
                            href="/"
                            className="mt-5 rounded-full bg-[#C2F800] px-6 py-3 font-inter text-[11px] font-bold text-black transition hover:bg-[#d2ff32]"
                        >
                            Go to workouts
                        </Link>
                    </div>
                ) : (
                    /* =========================
                        WORKOUT LIST
                    ========================== */
                    <div className="mt-6 space-y-4">
                        {sortedWorkouts.map((workout) => {
                            const completed = completedIds.includes(workout.id);

                            return (
                                <div
                                    key={workout.id}
                                    className={`flex items-center gap-4 rounded-xl border border-[#252a33] bg-[#15181e] p-4 transition ${completed ? "opacity-60" : ""
                                        }`}
                                >
                                    {/* IMAGE */}
                                    <Link
                                        href={`/workout/${workout.id}`}
                                        className="relative h-[80px] w-[145px] shrink-0 overflow-hidden rounded-lg"
                                    >
                                        <Image
                                            src={workout.image}
                                            alt={workout.name}
                                            fill
                                            className="object-cover"
                                            sizes="145px"
                                        />
                                    </Link>

                                    {/* WORKOUT INFO */}
                                    <div className="min-w-0 flex-1">
                                        <h2
                                            className={`font-oswald text-[16px] font-bold uppercase ${completed ? "line-through" : ""
                                                }`}
                                        >
                                            {workout.name}
                                        </h2>

                                        <p className="mt-1 truncate font-inter text-[11px] text-[#777d87]">
                                            {workout.equipment}
                                        </p>

                                        {/* Stats */}
                                        <div className="mt-3 flex flex-wrap items-center gap-4 font-inter text-[10px] text-[#c4c7cc]">

                                            {/* Duration */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#C2F800"
                                                    strokeWidth="2"
                                                    className="h-[13px] w-[13px]"
                                                >
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M12 7v5l3 2" />
                                                </svg>

                                                <span>{workout.duration} min</span>
                                            </div>

                                            {/* Calories */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#C2F800"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-[13px] w-[13px]"
                                                >
                                                    <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 2-1 3-2 4 0-4-2-7-5-10 0 4-3 6-3 11 0 5 3 9 7 9Z" />
                                                </svg>

                                                <span>
                                                    {workout.caloriesBurned} kcal
                                                </span>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1.5">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="#C2F800"
                                                    className="h-[13px] w-[13px]"
                                                >
                                                    <path d="m12 2.5 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.32l-5.8 3.05 1.11-6.47-4.7-4.58 6.49-.94L12 2.5Z" />
                                                </svg>

                                                <span>{workout.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex shrink-0 items-center gap-3">

                                        {/* View Details */}
                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="hidden rounded-full border border-[#343a45] px-5 py-2 font-inter text-[10px] text-[#d4d6da] transition hover:border-[#C2F800] hover:text-[#C2F800] sm:block"
                                        >
                                            View Details
                                        </Link>

                                        {/* Mark as Done only on Today's Plan */}
                                        {activeTab === "plan" && (
                                            <button
                                                type="button"
                                                onClick={() => toggleCompleted(workout.id)}
                                                className={`hidden rounded-full px-5 py-2 font-inter text-[10px] font-semibold transition sm:block ${completed
                                                    ? "border border-[#C2F800] text-[#C2F800]"
                                                    : "bg-[#C2F800] text-black hover:bg-[#d2ff32]"
                                                    }`}
                                            >
                                                {completed ? "Completed" : "✓ Mark as Done"}
                                            </button>
                                        )}

                                        {/* REMOVE */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(workout.id)}
                                            aria-label={`Remove ${workout.name}`}
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] text-[#777d87] transition hover:bg-[#242830] hover:text-white"
                                        >
                                            ×
                                        </button>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </section>
        </main>
    );
};

export default MyPlanPage;