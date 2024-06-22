import { Suspense } from "react"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { getPagesRoutes } from "@/router/router.const"
import { CircularProgress } from "@mui/material"
import { AppLogo } from "@/assets"
import Navbar from "@/components/Navbar"

function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary FallbackComponent={() => <img src={AppLogo} />}>
          <Navbar />
          {/* <AuthorizationProvider> */}
          {/* <Protected> */}
          {/* </Protected> */}
          <Outlet />
          {/* </AuthorizationProvider> */}
        </ErrorBoundary>
      ),
      children: getPagesRoutes(),
    },
  ])

  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default Router
