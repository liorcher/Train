import { theme } from "@/configs"
import { WorkoutType } from "@/types/workout.type"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike"
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"
import { SxProps } from "@mui/material"

const WorkoutIcon = ({ type }: { type: WorkoutType }) => {
  const workoutIcon: SxProps = {
    style: {
      color: theme.palette.primary.contrastText,
      fontSize: "3rem",
    },
  }

  const workoutIconMap = {
    [WorkoutType.Cycling]: <DirectionsBikeIcon {...workoutIcon} />,
    [WorkoutType.Strength]: <FitnessCenterIcon {...workoutIcon} />,
    [WorkoutType.Cardio]: <DirectionsRunIcon {...workoutIcon} />,
    [WorkoutType.Flexibility]: <AccessibilityNewIcon {...workoutIcon} />,
  }
  return workoutIconMap[type]
}

export default WorkoutIcon
