import { theme } from "@/configs"
import { Workout } from "@/types/workout.type"
import { Box, Button, Typography } from "@mui/material"
import React from "react"

type Props = {
  workouts: Workout[]
  setWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const WorkoutPlan = ({ workouts, setWorkout }: Props) => {
  const workout1 = workouts[0]
  const workout2 = workouts[1]
  const workout3 = workouts[2]

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        padding: "1rem",
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        overflowY: "auto",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant="h3" color="primary.contrastText" sx={{ mb: 2 }}>
        Workout Plan
      </Typography>
      <Button onClick={() => setWorkout(workout1)}>
        workout1: {workout1.done.toString()}
      </Button>
      <Button onClick={() => setWorkout(workout2)}>
        workout2: {workout2.done.toString()}
      </Button>
      <Button onClick={() => setWorkout(workout3)}>
        workout3: {workout3.done.toString()}
      </Button>
    </Box>
  )
}

export default WorkoutPlan
