import './App.css';
import { theme } from './configs';
import { ThemeProvider, styled } from '@mui/material';
import { AppLogo } from './assets';

const StyledApp = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp className='app'>
        <img src={AppLogo} />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
