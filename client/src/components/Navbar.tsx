import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import { AppLogo } from "@/assets"
import { HOME_URL } from "@/router/router.const"
import { IconButton } from "@mui/material"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const condition = false

  return (
    <AppBar position="fixed" sx={{ borderBottom: "0.1rem solid white" }}>
      <Toolbar>
        {/* Left Side: Logo and Two Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(HOME_URL)}>
            <Box component="img" src={AppLogo} sx={{ width: "6vw" }} />
          </IconButton>
          <Button color="inherit">WORKOUTES</Button>
          <Button color="inherit">MENU</Button>
        </Box>

        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Conditional Rendering */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {condition ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Text Input"
            />
          ) : (
            <>
              <Button color="inherit">SIGN IN</Button>
              <Button color="inherit">SIGN UP</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
