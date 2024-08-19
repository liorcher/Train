import { SxProps } from '@mui/material';

const container: SxProps = {
  sx: { borderBottom: `2px solid white` },
};

const exerciseDescription: SxProps = {
  variant: 'h5',
  color: 'primary.contrastText',
  sx: {
    overflowY: 'auto',
    height: '70px',
    textAlign: 'center',
  },
};

export default {
  container,
  exerciseDescription,
};
