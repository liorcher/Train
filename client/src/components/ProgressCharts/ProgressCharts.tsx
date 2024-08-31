import { Chart } from "@/types/chart.type"
import { Grid, Typography } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import Styles from "./ProgressCharts.style"

const ProgressCharts: React.FC = () => {
  const mockData = { caloriesBurned: 20, weightLoss: 10 }
  const charts: Chart[] = [
    { title: "Calories Burn", data: mockData.caloriesBurned },
    { title: "Weight Loss", data: mockData.weightLoss },
  ]

  const gaugeSettings = (chart: Chart) => ({
    value: chart.data,
    cornerRadius: "50%",
    sx: Styles.gauge,
    text: `${chart.data}%`,
  })

  return (
    <Grid container direction="row" sx={{ gap: 30, margin: "5vw" }}>
      {charts.map((chart, index) => (
        <Grid
          item
          key={index}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={Styles.title}>{chart.title}</Typography>
          <Gauge {...gaugeSettings(chart)} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProgressCharts
