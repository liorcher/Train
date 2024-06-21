import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4B36C7',
      contrastText: '#fffff',
    },
    secondary: {
      light: '#D9D9D9',
      main: '#BFBFBF',
      dark: '#BDBDBD',
    },
    success: {
      main: '#34AA16',
    },
    error: {
      main: '#AA1616',
    },
    info: {
      main: '#ffffff',
      dark: '#000000',
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
  },
  spacing: 4,
});
