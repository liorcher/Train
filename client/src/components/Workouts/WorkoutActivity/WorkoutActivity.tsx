import { Workout, WorkoutType } from "@/types/workout.type"
import { Box, Button, Stack, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike"
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"
import WorkoutActivityField from "./WorkoutActivityField"
import Styles from "./WorkoutActivity.style"
import { getPrettyDuration } from "./WorkoutActivity.utils"

type Props = {
  workout: Workout
  setWorkout: Dispatch<SetStateAction<Workout>>
}

const WorkoutActivity = ({ workout, setWorkout }: Props) => {
  const duration = getPrettyDuration(workout.durationMin)

  const datetime = format(workout.datetime, "EEEE, HH:mm, dd/MM/yyyy")

  const workoutIconMap = {
    [WorkoutType.Cycling]: <DirectionsBikeIcon {...Styles.workoutIcon} />,
    [WorkoutType.Strength]: <FitnessCenterIcon {...Styles.workoutIcon} />,
    [WorkoutType.Cardio]: <DirectionsRunIcon {...Styles.workoutIcon} />,
    [WorkoutType.Flexibility]: <AccessibilityNewIcon {...Styles.workoutIcon} />,
  }
  const workoutIcon = workoutIconMap[workout.type] || null

  const fieldValues = [
    { value: workout.type },
    { value: datetime },
    { label: "Duration", value: duration },
    { label: "Calories burnt", value: `${workout.calories} calories` },
  ]

  const handleDone = () => {
    setWorkout({ ...workout, done: true })
  }

  return (
    workout && (
      <Box sx={Styles.outerBox}>
        <Box sx={Styles.innerBox}>
          <Typography {...Styles.title}>Workout Details</Typography>
          <Box sx={Styles.workoutIconBox}>{workoutIcon}</Box>
        </Box>

        <Stack spacing={8}>
          {fieldValues.map((field, index) => (
            <WorkoutActivityField key={index} {...field} />
          ))}
        </Stack>

        <Box sx={Styles.doneButtonBox}>
          <Button {...Styles.doneButton} onClick={() => handleDone}>
            Done it!
          </Button>
        </Box>
      </Box>
    )
  )
}

export default WorkoutActivity
