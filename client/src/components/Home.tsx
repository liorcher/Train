import React from 'react';
import { Box } from '@mui/material';
import { LogoCaption } from '@/assets';
import { WithTrainersImages } from './HOC';

export const Home: React.FC = WithTrainersImages(() => {
  return <Box component='img' src={LogoCaption} sx={{ width: '16vw' }} />;
});
