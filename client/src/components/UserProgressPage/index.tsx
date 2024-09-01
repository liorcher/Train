import { WorkoutApi } from "@/api"
import {
  useGlobalModalContext,
  usePersonalizedTrainingPlanContext,
} from "@/contexts"
import { useAuth } from "@/contexts/AuthContext"
import { Button, Grid, Grow, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "sonner"
import { WithTrainersImages } from "../HOC"
import Loader from "../Loader"
import { Form } from "../PreferenceQuestionnaire/Form"
import ProgressCharts from "../ProgressCharts/ProgressCharts"
import style from "./style"

export const UserProgressPage = WithTrainersImages(() => {
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const { currentUser, loading } = useAuth()
  const location = useLocation()
  const { showModal } = useGlobalModalContext()
  const { updateWorkouts } = usePersonalizedTrainingPlanContext()
  const showIntroduction = !!location?.state?.firstTime

  const handlePreferencesSave = async () => {
    setIsGeneratingPlan(true)
    try {
      const workouts = await WorkoutApi.createWorkoutPlan()
      updateWorkouts(workouts)
      toast.success("your workout plan has been created successfully")
    } catch (error) {
      toast.error("error occured while trying to create user plan")
      console.error("error occured while trying to create user plan", error)
    } finally {
      setIsGeneratingPlan(false)
    }
  }

  return isGeneratingPlan ? (
    <Grid
      container
      height={"100%"}
      alignContent={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "secondary.dark" }}
      direction={"column"}
    >
      <Loader
        LoadingText={
          <Typography
            variant={"h3"}
            color={"secondary.light"}
            fontWeight={700}
            textAlign={"center"}
            sx={style.loadingText}
          >
            {`I'm setting up your custom training plan`}
            <br />
            {"Please wait a moment"}
          </Typography>
        }
      />
    </Grid>
  ) : loading ? (
    <Loader />
  ) : (
    <Grid
      container
      height={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item>
        <Grow in timeout={3000}>
          <Typography variant={"h3"} color={"secondary.light"} fontWeight={700}>
            {showIntroduction
              ? "Welcome to TRAIN"
              : `Welcome Back, ${currentUser?.name}`}
            <br />
          </Typography>
        </Grow>
      </Grid>
      {currentUser?.filledPreferences ? (
        <Grow in timeout={3000}>
          <Grid item>
            <ProgressCharts />
          </Grid>
        </Grow>
      ) : (
        <>
          <Grid item>
            <Typography variant={"h4"} color={"secondary.light"}>
              {showIntroduction
                ? "To start our journey, I need to know more about you, click here to fill your preferences >"
                : "Wanted to let you know that you didn't filled your preferences yet >"}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() =>
                showModal(Form, {
                  onSaveSuccess: () => {
                    handlePreferencesSave()
                  },
                })
              }
            >
              <Typography
                variant={"h4"}
                color={"info.light"}
                fontWeight={600}
                sx={{ textDecoration: "underline" }}
              >
                {"Fill now"}
              </Typography>
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  )
})
