import { Box, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import WorkoutActivity from "./WorkoutActivity/WorkoutActivity"
import { Workout } from "@/types/workout.type"
import WorkoutPlan from "./WorkoutPlan/WorkoutPlan"
import Styles from "./WorkoutsPage.style"
import { workoutsMockData } from "./workoutsMockData"

const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null)
  const [workout, setWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    setWorkouts(workoutsMockData)
    setWorkout(workoutsMockData[0])
  }, [])

  const fetchWorkouts = () => {
    setWorkouts([])
    setTimeout(() => {
      setWorkouts(workoutsMockData)
    }, 1000)
  }

  return (
    <Box sx={Styles.outerBox}>
      <Stack {...Styles.stack}>
        <WorkoutPlan
          workouts={workouts}
          setWorkout={setWorkout}
          fetchWorkouts={fetchWorkouts}
        />
        <WorkoutActivity workout={workout} setWorkout={setWorkout} />
      </Stack>
    </Box>
  )
}

export default WorkoutsPage
