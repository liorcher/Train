import { RouteObject } from "react-router-dom"
import Login from "@components/Login"
import Home from "@components/Home"
import { protectedRoute } from "./ProtectedRoute"
import Unauthorized from "@/components/Unauthorized"
import Workouts from "@/components/Workouts"
import Signup from "@/components/Signup"

export const HOME_URL = "/"
export const LOGIN_URL = "/login"
export const UNAUTHORIZED_URL = "/unauthorized"
export const WORKOUTS_URL = "/workouts"
export const SIGNUP_URL = "/signup"
const routes = [
  { path: LOGIN_URL, element: <Login />, id: "Login" },
  { path: SIGNUP_URL, element: <Signup />, id: "Signup" },
  { path: `/unauthorized`, element: <Unauthorized />, id: "Unauthorized" },
  {
    path: HOME_URL,
    element: <Home />,
    id: "Home",
  },
  {
    path: WORKOUTS_URL,
    element: protectedRoute(<Workouts />),
    id: "Workouts",
  },
]

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes]
}
