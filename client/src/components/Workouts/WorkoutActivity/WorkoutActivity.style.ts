import { theme } from "@/configs"
import { SxProps } from "@mui/material"

const outerBox: SxProps = {
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
}

const innerBox: SxProps = {
  display: "flex",
  alignItems: "center",
  mb: "5%",
  pb: 1,
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
}

const workoutIcon: SxProps = {
  fontSize: "large" as const,
  style: {
    color: theme.palette.primary.contrastText,
  },
}

const title: SxProps = {
  variant: "h3",
  color: "primary.contrastText",
  sx: { textAlign: "left" },
}

const workoutIconBox: SxProps = {
  ml: 5,
}

const doneButton: SxProps = {
  variant: "contained",
  color: "secondary",
}

const doneButtonBox: SxProps = { mt: "auto", alignSelf: "flex-end" }

export default {
  outerBox,
  innerBox,
  workoutIcon,
  title,
  workoutIconBox,
  doneButtonBox,
  doneButton,
}
