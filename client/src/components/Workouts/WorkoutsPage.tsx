import { Box, Stack } from "@mui/material"
import React, { useState } from "react"
import WorkoutActivity from "./WorkoutActivity"
import { Workout, WorkoutType } from "@/types/workout.type"
import WorkoutPlan from "./WorkoutPlan"

const WorkoutsPage: React.FC = () => {
  const workouts: Workout[] = [
    {
      type: WorkoutType.Strength,
      datetime: new Date("2021-10-10T10:00:00"),
      durationMin: 60,
      calories: 300,
    },
    {
      type: WorkoutType.Cardio,
      datetime: new Date("2021-10-10T12:00:00"),
      durationMin: 30,
      calories: 200,
    },
    {
      type: WorkoutType.Flexibility,
      datetime: new Date("2021-10-10T14:00:00"),
      durationMin: 45,
      calories: 150,
    },
  ]

  const [workout, setWorkout] = useState(workouts[0])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "auto",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={20}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <WorkoutPlan workouts={workouts} setWorkout={setWorkout} />
        <WorkoutActivity workout={workout} />
      </Stack>
    </Box>
  )
}

export default WorkoutsPage
