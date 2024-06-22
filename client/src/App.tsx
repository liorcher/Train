import "./App.css"
import { theme } from "./configs"
import { ThemeProvider, styled } from "@mui/material"
import Router from "@/router/router"

const StyledApp = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: theme.typography.fontFamily,
}))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp className="app">
        <Router />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
