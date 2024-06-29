import { Workout } from "@/types/workout.type"
import { Box, Button, Stack, Typography } from "@mui/material"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"
import WorkoutIcon from "../WorkoutIcon"
import Styles from "./WorkoutActivity.style"
import { getPrettyDuration } from "./WorkoutActivity.utils"
import WorkoutActivityField from "./WorkoutActivityField"

type Props = {
  workout: Workout | null
  setWorkout: Dispatch<SetStateAction<Workout | null>>
}

const WorkoutActivity = ({ workout, setWorkout }: Props) => {
  if (!workout) return null

  const duration = getPrettyDuration(workout.durationMin)
  const datetime = format(workout.datetime, "EEEE, HH:mm, dd/MM/yyyy")

  const fieldValues = [
    { value: workout.type },
    { value: datetime },
    { label: "Duration", value: duration },
    { label: "Calories burnt", value: `${workout.calories} calories` },
  ]

  const handleDone = () => {
    setWorkout({ ...workout, isDone: true })
  }

  return (
    workout && (
      <Box sx={Styles.outerBox}>
        <Box sx={Styles.titleBox}>
          <Typography {...Styles.title}>Workout Details</Typography>
          <Box sx={Styles.workoutIconBox}>
            <WorkoutIcon type={workout.type} />
          </Box>
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
