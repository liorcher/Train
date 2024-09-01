import { AppLogo } from '@/assets';
import { Grid } from '@mui/material';
import React from 'react';
import { WithTrainersImages } from './HOC';

export const Home: React.FC = WithTrainersImages(() => {
  return (
    <Grid container height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Grid item>
        <img src={AppLogo} width={'600vw'} height={'250vh'} />
      </Grid>
    </Grid>
  );
});
