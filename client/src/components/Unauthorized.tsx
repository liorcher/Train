import { HOME_URL } from "@/router/router.const"
import { Button } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

const Unauthorized: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1 style={{ color: "red" }}>Unauthorized</h1>
      <p style={{ color: "white" }}>
        You are not authorized to access this page.
      </p>
      <Button color="error" onClick={() => navigate(HOME_URL)}>
        Go Home
      </Button>
    </div>
  )
}

export default Unauthorized
