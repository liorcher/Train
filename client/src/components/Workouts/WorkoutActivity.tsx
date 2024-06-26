import { theme } from "@/configs"
import { Workout } from "@/types/workout.type"
import { Box, Button, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { format } from "date-fns"

type Props = {
  workout: Workout
  setWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const WorkoutActivity: React.FC<Props> = ({ workout, setWorkout }: Props) => {
  const getPrettyDuration = (durationMin: number) => {
    if (durationMin < 60) {
      return `${durationMin} minutes`
    } else {
      const hours = Math.floor(durationMin / 60)
      const minutes = durationMin % 60
      return `${hours} hours ${minutes} minutes`
    }
  }

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

  return (
    workout && (
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
        <Typography
          variant="h3"
          color="secondary"
          sx={{ mb: 2, textAlign: "left", width: "100%" }}
        >
          Workout Details
        </Typography>

        <Typography
          variant="body1"
          color="secondary"
          sx={{ textAlign: "left", width: "100%" }}
        >
          {workout.type}
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ textAlign: "left", width: "100%" }}
        >
          {datetime}
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ textAlign: "left", width: "100%" }}
        >
          <strong>Duration: </strong>
          {duration}
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ textAlign: "left", width: "100%" }}
        >
          <strong>Calories burnt: </strong>
          {workout.type} calories
        </Typography>

        <Button onClick={() => handleDone}>Done it!</Button>
      </Box>
    )
  )
}

export default WorkoutActivity
