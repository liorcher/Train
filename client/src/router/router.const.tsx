import { RouteObject } from "react-router-dom"
// import AuthorizationMain from "../auth/AuthorizationMain"
import Login from "@components/Login"
// import UnauthorizedPage from "../auth/pages/Unauthorized/UnauthorizedPage"
import Home from "@components/Home"
import { protectedRoute } from "./ProtectedRoute"

export const HOME_URL = "/"
export const LOGIN_URL = "/login"

const routes = [
  { path: LOGIN_URL, element: <Login />, id: "Login" },
  //   { path: /unauthorized`, element: <UnauthorizedPage />, id: "Unauthorized" },
  {
    path: HOME_URL,
    element: <Home />,
    id: "Home",
  },
  // {
  //   path: HOME_URL,
  //   element: protectedRoute(<Home />),
  //   id: "Home",
  // },
]

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes]
}
