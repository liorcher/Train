import { alpha, createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#D9D9D9',
      main: '#BFBFBF',
      dark: '#5E5E5E',
    },
    success: {
      main: '#34AA16',
    },
    error: {
      main: '#FF0000',
    },
    info: {
      main: '#4B36C7',
      dark: '#ffffff',
    },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: 56,
    },
    h2: {
      fontSize: 48,
    },
    h3: {
      fontSize: 40,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 12,
    },
    body1: {
      fontSize: 10,
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          backgroundColor: theme.palette.primary.main,
          width: "0.5rem",
          height: "0.5rem",
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
          backgroundColor: theme.palette.secondary.light,
        },
        "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
          {
            backgroundColor: alpha(theme.palette.primary.main, 0.7),
          },
        "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
          {
            backgroundColor: alpha(theme.palette.primary.main, 0.7),
          },
        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
          {
            backgroundColor: alpha(theme.palette.secondary.main, 0.7),
          },
        "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },
      }),
    },
  },
})
