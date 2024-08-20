import React from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';

interface Props {
  size?: number;
  LoadingText?: React.ReactElement;
}

const Loader: React.FC<Props> = ({ size, LoadingText }) => {
  const loaderBox: SxProps = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '1rem',
  };

  return (
    <Box sx={loaderBox}>
      {LoadingText && LoadingText}
      <CircularProgress color='error' size={size} />
    </Box>
  );
};

export default Loader;
