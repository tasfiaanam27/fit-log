# FitLog – Workout Library

FitLog is a responsive workout library and fitness planning application built with Next.js, TypeScript, and Tailwind CSS. It allows users to browse workouts, view detailed exercise information, create a workout plan for the day, and save workouts for later.

The project was developed based on the provided Figma design and uses workout data from the FitLog API.

## Live Website

Live Site: [Add your deployed website link here]

## Features

- Browse a library of workouts fetched from the FitLog API
- View detailed information for each workout
- See muscle groups, equipment, difficulty, sets, reps, duration, calories, rating, and instructions
- Add workouts to Today's Plan
- Save workouts for later
- Dynamic Plan and Saved counters in the navbar
- Prevents duplicate workouts from being added to the same list
- Remove workouts from Today's Plan or Saved
- Mark planned workouts as completed
- Sort workouts by duration, calories, or rating
- Toast notifications for workout actions
- Plan and Saved workouts remain available after page refresh using localStorage
- Responsive layout for desktop, tablet, and mobile devices
- Fixed navigation bar for easy access while scrolling
- Empty states when there are no planned or saved workouts

## Pages

### Workout Library

The home page displays the available workouts in a responsive card layout. Each workout card includes important information such as muscle group, equipment, duration, calories burned, and rating.

Users can select a workout to open its details page.

### Workout Details

The workout details page displays complete information about a selected workout, including:

- Workout name and image
- Description
- Target muscle groups
- Equipment
- Difficulty
- Sets and reps
- Duration
- Calories burned
- Rating
- Step-by-step instructions

From this page, users can add the workout to Today's Plan or save it for later.

### My Plan

The My Plan page contains two tabs:

- **Today's Plan** – workouts selected for the current workout plan
- **Saved** – workouts saved for later

The page also displays a summary of the number of exercises, total workout duration, and estimated calories.

Planned workouts can be marked as done or removed, while saved workouts can also be removed when they are no longer needed.

## Toast Notifications

Toast notifications provide feedback when users perform actions such as:

- Adding a workout to Today's Plan
- Saving a workout for later
- Marking a workout as done
- Removing a workout

## Data Persistence

FitLog uses the browser's `localStorage` to store Today's Plan and Saved workouts.

This means the selected workouts remain available even after refreshing the page.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- FitLog REST API
- Browser localStorage

## API

FitLog uses the following API for workout data:

```text
https://api.api-store.workers.dev/api/fitlog
```

Single workout:

```text
https://api.api-store.workers.dev/api/fitlog/:id
```

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## Project Structure

```text
src/
├── app/
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── WorkoutLibrary.tsx
│   ├── WorkoutCard.tsx
│   └── WorkoutActions.tsx
│
├── context/
│   ├── WorkoutContext.tsx
│   └── ToastContext.tsx
│
└── types/
    └── workout.ts
```

## Responsive Design

The application was built to closely follow the provided Figma design while remaining responsive across different screen sizes.

The workout grid, workout details page, navigation, My Plan page, buttons, and other interface elements adapt for desktop, tablet, and mobile screens.

