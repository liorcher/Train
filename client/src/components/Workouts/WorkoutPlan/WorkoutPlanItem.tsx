import { Workout, WorkoutType } from "@/types/workout.type"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike"
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"
import { Box, Typography } from "@mui/material"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"
import Styles from "./WorkoutPlan.style"

type Props = {
  workout: Workout
  setWorkout: Dispatch<SetStateAction<Workout | null>>
  index: number
}

const WorkoutPlanItem = ({ workout, setWorkout, index }: Props) => {
  const datetime = format(workout.datetime, "EEEE, HH:mm, dd/MM/yyyy")

  const workoutIconMap = {
    [WorkoutType.Cycling]: <DirectionsBikeIcon {...Styles.workoutIcon} />,
    [WorkoutType.Strength]: <FitnessCenterIcon {...Styles.workoutIcon} />,
    [WorkoutType.Cardio]: <DirectionsRunIcon {...Styles.workoutIcon} />,
    [WorkoutType.Flexibility]: <AccessibilityNewIcon {...Styles.workoutIcon} />,
  }
  const workoutIcon = workoutIconMap[workout.type]

  return (
    <Box
      sx={Styles.workoutPlanItemBox(workout.isDone)}
      key={index}
      onClick={() => setWorkout(workout)}
    >
      <Box sx={Styles.workoutPlanItemIconBox}>{workoutIcon}</Box>

      <Box>
        <Typography {...Styles.field}>{datetime}</Typography>
        <Typography {...Styles.field}>{workout.type}</Typography>
      </Box>
    </Box>
  )
}

export default WorkoutPlanItem
