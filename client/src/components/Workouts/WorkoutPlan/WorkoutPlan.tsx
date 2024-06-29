import { Workout } from "@/types/workout.type"
import { Refresh } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import Styles from "./WorkoutPlan.style"
import WorkoutPlanItem from "./WorkoutPlanItem"

type Props = {
  workouts: Workout[]
  setWorkout: Dispatch<SetStateAction<Workout | null>>
  fetchWorkouts: () => void
}

const WorkoutPlan = ({ workouts, setWorkout, fetchWorkouts }: Props) => {
  return (
    <Box sx={Styles.outerBox}>
      <Box sx={Styles.titleBox}>
        <Typography {...Styles.title}>Your Weekly Workout Plan</Typography>
        <Box sx={Styles.workoutIconBox}>
          <Tooltip title="Refresh workout plan">
            <IconButton onClick={fetchWorkouts}>
              <Refresh {...Styles.refreshButton} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={Styles.workoutList}>
        {workouts.map((workout, index) => (
          <WorkoutPlanItem
            key={index}
            workout={workout}
            setWorkout={setWorkout}
            index={index}
          />
        ))}
      </Box>
    </Box>
  )
}

export default WorkoutPlan
