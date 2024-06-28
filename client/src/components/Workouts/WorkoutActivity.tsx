import { theme } from "@/configs"
import { Workout, WorkoutType } from "@/types/workout.type"
import { Box, Button, Stack, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { format } from "date-fns"
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike"
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"

type Props = {
  workout: Workout
  setWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const WorkoutActivityField: React.FC<{ label?: string; value: string }> = ({
  label,
  value,
}) => (
  <Typography
    variant="body1"
    color="primary.contrastText"
    sx={{ textAlign: "left", width: "100%", mb: 1 }}
  >
    {label && <strong>{label}: </strong>}
    {value}
  </Typography>
)

const WorkoutActivity: React.FC<Props> = ({ workout, setWorkout }: Props) => {
  const getPrettyDuration = (durationMin: number) => {
    if (durationMin < 60) {
      return `${durationMin} minutes`
    } else {
      const hours = Math.floor(durationMin / 60)
      const minutes = durationMin % 60
      const hourText =
        hours > 0 ? `${hours} ${hours === 1 ? "Hour" : "Hours"}` : ""
      const minuteText = minutes > 0 ? `${minutes} Minutes` : ""
      return `${hourText} ${minuteText}`.trim()
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

  const workoutIcon = useMemo(() => {
    const iconProps = {
      fontSize: "large" as const,
      style: {
        color: theme.palette.primary.contrastText,
      },
    }

    switch (workout.type) {
      case WorkoutType.Cycling:
        return <DirectionsBikeIcon {...iconProps} />
      case WorkoutType.Strength:
        return <FitnessCenterIcon {...iconProps} />
      case WorkoutType.Cardio:
        return <DirectionsRunIcon {...iconProps} />
      case WorkoutType.Flexibility:
        return <AccessibilityNewIcon {...iconProps} />
      default:
        return null
    }
  }, [workout.type])

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
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "5%",
            pb: 1,
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Typography
            variant="h3"
            color="primary.contrastText"
            sx={{ textAlign: "left" }}
          >
            Workout Details
          </Typography>
          <Box sx={{ ml: 5 }}>{workoutIcon}</Box>
        </Box>

        <Stack spacing={8}>
          <WorkoutActivityField value={workout.type} />
          <WorkoutActivityField value={datetime} />
          <WorkoutActivityField label="Duration" value={duration} />
          <WorkoutActivityField
            label="Calories burnt"
            value={`${workout.calories} calories`}
          />
        </Stack>

        <Box sx={{ mt: "auto", alignSelf: "flex-end" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDone}
          >
            Done it!
          </Button>
        </Box>
      </Box>
    )
  )
}

export default WorkoutActivity
