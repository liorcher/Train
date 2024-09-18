import React, { PropsWithChildren } from 'react';
import { Grid, Typography } from '@mui/material';
import style from './style';

interface Props {
  groupTitle: string;
}

export const ChartsGroup: React.FC<PropsWithChildren<Props>> = ({ groupTitle, children }) => {
  return (
    <Grid
      container
      item
      height={'100%'}
      justifyContent={'center'}
      direction={'column'}
      rowGap={'2rem'}
      sx={style.groupContainer}
    >
      <Typography variant={'h4'} fontWeight={600} color={'secondary.light'} textAlign={'left'}>
        {groupTitle}
      </Typography>
      {children}
    </Grid>
  );
};
