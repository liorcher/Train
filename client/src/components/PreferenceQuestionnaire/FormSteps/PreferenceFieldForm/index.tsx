import React from 'react';
import { StepSubTitle, StepTitle } from '../style';
import { FormControl, Grid } from '@mui/material';

interface Props {
  title: string;
  fields: { fieldTitle: string; field: React.ReactNode; required: boolean }[];
}

export const PreferenceFieldForm: React.FC<Props> = ({ title, fields }) => {
  return (
    <Grid container height={'100%'} gap={'1rem .5rem'} direction={'column'} marginTop={2}>
      <StepTitle variant={'h5'}>{title}</StepTitle>
      <Grid item container gap={'2rem .5rem'}>
        {fields.map(({ fieldTitle, field, required }, index) => (
          <Grid item container key={`preferencesFormStepField-${index}`}>
            <FormControl fullWidth>
              <StepSubTitle required={required}>{fieldTitle}</StepSubTitle>
              {field}
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
