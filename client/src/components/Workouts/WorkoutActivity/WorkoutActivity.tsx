import { Workout, WorkoutType } from "@/types/workout.type"
import { Box, Button, Stack, Typography } from "@mui/material"
import React, { useMemo } from "react"
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
  setWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const WorkoutActivity = ({ workout, setWorkout }: Props) => {
  const duration = useMemo(
    () => getPrettyDuration(workout.durationMin),
    [workout.durationMin]
  )

  const datetime = useMemo(
    () => format(workout.datetime, "EEEE, HH:mm, dd/MM/yyyy"),
    [workout.datetime]
  )

  const handleDone = () => {
    setWorkout({ ...workout, done: true })
  }

  const workoutIcon = useMemo(() => {
    switch (workout.type) {
      case WorkoutType.Cycling:
        return <DirectionsBikeIcon {...Styles.workoutIcon} />
      case WorkoutType.Strength:
        return <FitnessCenterIcon {...Styles.workoutIcon} />
      case WorkoutType.Cardio:
        return <DirectionsRunIcon {...Styles.workoutIcon} />
      case WorkoutType.Flexibility:
        return <AccessibilityNewIcon {...Styles.workoutIcon} />
      default:
        return null
    }
  }, [workout.type])

  const fieldValues = [
    { value: workout.type },
    { value: datetime },
    { label: "Duration", value: duration },
    { label: "Calories burnt", value: `${workout.calories} calories` },
  ]

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
