import { Box, CircularProgress, SxProps } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  const loaderBox: SxProps = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box sx={loaderBox}>
      <CircularProgress color='error' />
    </Box>
  );
};

export default Loader;
