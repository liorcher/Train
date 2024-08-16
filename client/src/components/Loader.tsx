import React from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';

interface Props {
  size?: number;
}

const Loader: React.FC<Props> = ({ size }) => {
  const loaderBox: SxProps = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box sx={loaderBox}>
      <CircularProgress color='error' size={size} />
    </Box>
  );
};

export default Loader;
