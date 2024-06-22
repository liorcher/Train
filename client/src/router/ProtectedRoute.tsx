import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const route = `/login`

  return (
    <>
      {/* <AuthenticatedTemplate>{children}</AuthenticatedTemplate> */}
      {/* <UnauthenticatedTemplate> */}
      <Navigate to={route} replace />
      {/* </UnauthenticatedTemplate> */}
    </>
  )
}

export const protectedRoute = (step: ReactNode) => (
  <ProtectedRoute>{step}</ProtectedRoute>
)