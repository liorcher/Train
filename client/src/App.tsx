import './App.css';
import { theme } from './configs';
import { ThemeProvider, styled } from '@mui/material';
import { PreferenceQuestionnaire } from './components';
import globalStyles from './globalStyles';

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
      {globalStyles}
      <StyledApp className='app'>
        <PreferenceQuestionnaire />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
