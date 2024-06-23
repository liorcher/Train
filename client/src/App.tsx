import "./App.css"
import { theme } from "./configs"
import { CssBaseline, Stack, ThemeProvider, styled } from "@mui/material"
import Router from "@/router/router"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Stack
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Router />
        </Stack>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
