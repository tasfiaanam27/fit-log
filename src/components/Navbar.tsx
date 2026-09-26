"use client";

import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { plan, saved } = useWorkout();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-[#1f2228] bg-[#090a0c]">
      <nav className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="flex h-20 w-full items-center justify-between gap-2">

          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />

            <span className="font-oswald text-[18px] font-black leading-none text-white">
              FITLOG
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-full bg-[#1d2900] px-4 py-2 text-[12px] font-semibold text-[#C2F800]"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-[#9ca0aa] transition hover:text-white"
            >
              My Plan
            </Link>
          </div>

          {/* COUNTERS + MOBILE MENU */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-5">

            {/* PLAN COUNT */}
            <Link
              href="/my-plan"
              className="flex shrink-0 items-center gap-1 text-[11px] font-medium sm:gap-2 sm:text-[12px]"
            >
              <span className="text-[#9ca0aa]">
                Plan
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800] px-1 text-[10px] font-semibold text-black">
                {plan.length}
              </span>
            </Link>

            {/* SAVED COUNT */}
            <Link
              href="/my-plan"
              className="flex shrink-0 items-center gap-1 text-[11px] font-medium sm:gap-2 sm:text-[12px]"
            >
              <span className="text-[#9ca0aa]">
                Saved
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#343840] px-1 text-[10px] text-[#b6bac3]">
                {saved.length}
              </span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#292c32] text-[19px] leading-none text-white md:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>

          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="border-t border-[#1f2228] pb-4 pt-3 md:hidden">
            <div className="flex flex-col gap-1">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-md bg-[#1d2900] px-4 py-3 text-[12px] font-semibold text-[#C2F800]"
              >
                Workouts
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-[12px] font-medium text-[#9ca0aa] transition hover:bg-[#15171c] hover:text-white"
              >
                My Plan
              </Link>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;