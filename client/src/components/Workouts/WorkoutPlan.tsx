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
        padding: "1rem",
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        overflowY: "auto",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        margin: "100em",
      }}
    >
      <Typography variant="h3" color="secondary" sx={{ mb: 2 }}>
        Workout Plan
      </Typography>
      <Button onClick={() => setWorkout(workout1)}>workout1</Button>
      <Button onClick={() => setWorkout(workout2)}>workout2</Button>
      <Button onClick={() => setWorkout(workout3)}>workout3</Button>
    </Box>
  )
}

export default WorkoutPlan
