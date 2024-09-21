import { useState } from 'react';
import { toast } from 'sonner';
import { Grid, TextField, Typography } from '@mui/material';
import { UserApi } from '@/api';
import { useAuth } from '@/contexts';
import inputStyle from '../../../style';
import { WeeklyProgressCharts } from '../WeeklyProgressCharts';
import { WeightChart } from '../WeightChart';
import { ChartsGroup } from './ChartsGroup';

export const UserProgressContainer = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [currentWeight, setCurrentWeight] = useState(
    currentUser?.weightsProgress[currentUser?.weightsProgress.length - 1] || 0
  );

  if (!currentUser) return null;

  const updateUserWeight = async () => {
    if (
      currentWeight <= 0 ||
      currentWeight === currentUser.weightsProgress[currentUser.weightsProgress.length - 1]
    )
      return;
    try {
      await UserApi.updateUserWeight(currentWeight);
      setCurrentUser(() => ({
        ...currentUser,
        weightsProgress: [...currentUser.weightsProgress, currentWeight],
      }));
      toast.success('Weight updated successfully');
    } catch (error) {
      toast.error('Failed to update weight');
      console.error(error);
    }
  };

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      marginTop={10}
      wrap={'nowrap'}
      rowGap={'2rem'}
    >
      <ChartsGroup groupTitle={'Weekly Progress'}>
        <WeeklyProgressCharts />
      </ChartsGroup>
      <ChartsGroup groupTitle={'Weight Progress'}>
        <Grid item container direction={'row'}>
          <Grid item xs={7}>
            <Typography variant={'h5'} color={'secondary.light'}>
              {'Update your current weight'}
            </Typography>
            <TextField
              sx={{ ...inputStyle.numericInput, marginTop: '1rem' }}
              type='number'
              inputProps={{
                step: '0.01',
              }}
              InputProps={{ endAdornment: 'kg' }}
              value={currentWeight || 0}
              onChange={(e) => {
                setCurrentWeight(parseFloat(e.target.value));
              }}
              onBlur={updateUserWeight}
            />
          </Grid>
          <Grid item xs={5}>
            <WeightChart />
          </Grid>
        </Grid>
      </ChartsGroup>
    </Grid>
  );
};
