import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import { AppLogo } from "@/assets"
import {
  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  WORKOUTS_URL,
} from "@/router/router.const"
import { IconButton } from "@mui/material"
import { useAuth } from "@/contexts/AuthContext"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  return (
    <AppBar position="fixed" sx={{ borderBottom: "0.1rem solid white" }}>
      <Toolbar>
        {/* Left Side: Logo and Two Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(HOME_URL)}>
            <Box component="img" src={AppLogo} sx={{ width: "6vw" }} />
          </IconButton>
          <Button color="inherit" onClick={() => navigate(WORKOUTS_URL)}>
            WORKOUTES
          </Button>
          <Button color="inherit">MENU</Button>
        </Box>

        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Conditional Rendering */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {currentUser ? (
            <>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Text Input"
              />
              <Button color="inherit" onClick={logout}>
                SIGN OUT
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate(LOGIN_URL)}>
                SIGN IN
              </Button>
              <Button color="inherit" onClick={() => navigate(SIGNUP_URL)}>
                SIGN UP
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
