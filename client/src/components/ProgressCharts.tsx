import { Grid, Theme, Typography } from "@mui/material"
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge"

type Chart = {
  title: string
  data: number
}

function ProgressCharts() {
  const charts: Chart[] = [
    { title: "Calories Burn", data: 60 },
    { title: "Weight Loss", data: 70 },
  ]

  const gaugeSx = (theme: Theme) => ({
    width: "20vw",
    height: "50vh",
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 40,
      text: { fill: theme.palette.primary.light },
    },
    [`& .${gaugeClasses.valueArc}`]: {
      fill: theme.palette.error.main,
    },
    [`& .${gaugeClasses.referenceArc}`]: {
      fill: theme.palette.text.disabled,
    },
  })

  const gaugeSettings = (chart: Chart) => ({
    value: chart.data,
    cornerRadius: "50%",
    sx: gaugeSx,
    text: `${chart.data}%`,
  })

  return (
    <Grid container direction="row" sx={{ gap: 40 }}>
      {charts.map((chart, index) => (
        <Grid
          item
          key={index}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: '30px',
            }}
          >
            {chart.title}
          </Typography>
          <Gauge {...gaugeSettings(chart)} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProgressCharts
