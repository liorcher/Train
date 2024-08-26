import { AppLogo } from "@/assets"
import { useAuth } from "@/contexts/AuthContext"
import { Grid } from "@mui/material"
import React from "react"
import { WithTrainersImages } from "./HOC"
import ProgressCharts from "./ProgressCharts"

export const Home: React.FC = WithTrainersImages(() => {
  const { currentUser } = useAuth()

  return (
    <Grid
      container
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item>
        {currentUser ? (
          <ProgressCharts />
        ) : (
          <img src={AppLogo} width={"600vw"} height={"250vh"} />
        )}
      </Grid>
    </Grid>
  )
})
