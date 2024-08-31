import { Theme } from "@emotion/react"
import { SxProps } from "@mui/material"
import { gaugeClasses } from "@mui/x-charts/Gauge"

const gauge: SxProps = (theme: Theme) => ({
  width: "20vw",
  height: "45vh",
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 40,
    text: { fill: theme.palette.secondary.light },
  },
  [`& .${gaugeClasses.valueArc}`]: {
    fill: theme.palette.error.main,
  },
  [`& .${gaugeClasses.referenceArc}`]: {
    fill: theme.palette.secondary.dark,
  },
})
const title: SxProps = {
  color: "secondary.light",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "30px",
}

export default {
  gauge,
  title,
}
