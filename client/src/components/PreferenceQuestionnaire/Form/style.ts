import { Divider, styled } from '@mui/material';

export const ProgressBar = styled(Divider)<{ precentage: number }>(({ theme, precentage }) => ({
  height: '6px',
  background: `linear-gradient(to right, ${theme.palette.info.main} ${precentage}%, ${theme.palette.primary.light} ${precentage}%)`,
}));
