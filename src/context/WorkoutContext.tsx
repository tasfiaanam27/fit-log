"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Workout } from "@/types/workout";

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSavedWorkout: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const WorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      const alreadyAdded = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyAdded) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );
  };

  const saveWorkout = (workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  const removeSavedWorkout = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  };

  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSavedWorkout,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
};