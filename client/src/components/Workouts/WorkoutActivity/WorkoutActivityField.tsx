import { Typography } from "@mui/material"

type Props = { label?: string; value: string }

const WorkoutActivityField = ({ label, value }: Props) => (
  <Typography
    variant="body1"
    color="primary.contrastText"
    sx={{ textAlign: "left", width: "100%", mb: 1 }}
  >
    {label && <strong>{label}: </strong>}
    {value}
  </Typography>
)

export default WorkoutActivityField