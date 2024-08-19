import React from 'react';
import { Box, CircularProgress, SxProps, Typography } from '@mui/material';

interface Props {
  size?: number;
  loadingText?: string;
}

const Loader: React.FC<Props> = ({ size, loadingText }) => {
  const loaderBox: SxProps = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '1rem',
    clipPath: 'inset(0 2ch 0 0)',
    animation: 'l 1s steps(4) infinite',
  };

  return (
    <Box sx={loaderBox}>
      {loadingText && (
        <Typography
          variant={'h3'}
          color={'secondary.light'}
          fontWeight={700}
        >{`${loadingText}...`}</Typography>
      )}
      <CircularProgress color='error' size={size} />
    </Box>
  );
};

export default Loader;
