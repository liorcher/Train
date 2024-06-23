import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Grid,
} from "@mui/material"
import { useAuth } from "@/contexts/AuthContext"
import LogoCaption from "@/assets/LogoCaption.png"
import { theme } from "@/configs"

const SignUp: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { signup } = useAuth()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[0-9]{10}$/ // Adjust based on your phone number format requirements

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name) {
      setError("Name is required.")
      return
    }
    if (!email) {
      setError("Email is required.")
      return
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format.")
      return
    }
    if (!phone) {
      setError("Phone number is required.")
      return
    }
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number format.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      await signup(email, password)
      navigate("/")
    } catch (err) {
      setError("Failed to sign up. Please try again.")
    }
  }

  return (
    <Box
      sx={{
        // width: "100%",
        // maxHeight: "100%",
        padding: "1rem",
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box    
            component="img"
            src={LogoCaption}
            sx={{ width: "100%", maxWidth: "10vw", marginBottom: "1rem" }}
          />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <FormLabel
                sx={{
                  color: theme.palette.primary.contrastText,
                  textAlign: "left",
                }}
              >
                Name
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  borderRadius: "4px",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <FormLabel
                sx={{
                  color: theme.palette.primary.contrastText,
                  textAlign: "left",
                }}
              >
                Email Address
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                placeholder="example@trainer.com"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  borderRadius: "4px",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth margin="normal" required>
          <FormLabel
            sx={{
              color: theme.palette.primary.contrastText,
              textAlign: "left",
            }}
          >
            Phone Number
          </FormLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="phone"
            name="phone"
            autoComplete="phone"
            value={phone}
            placeholder="1234567890"
            onChange={(e) => setPhone(e.target.value)}
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              borderRadius: "4px",
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <FormLabel
            sx={{
              color: theme.palette.primary.contrastText,
              textAlign: "left",
            }}
          >
            Password
          </FormLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              borderRadius: "4px",
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <FormLabel
            sx={{
              color: theme.palette.primary.contrastText,
              textAlign: "left",
            }}
          >
            Confirm Password
          </FormLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            placeholder="******"
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              borderRadius: "4px",
            }}
          />
        </FormControl>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="info"
          sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
