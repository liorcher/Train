import { Button, Divider, styled } from '@mui/material';

export const ProgressBar = styled(Divider)<{ precentage: number }>(({ theme, precentage }) => ({
  height: '6px',
  background: `linear-gradient(to right, ${theme.palette.info.main} ${precentage}%, ${theme.palette.primary.light} ${precentage}%)`,
}));

export const FormActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.primary.contrastText,
  width: 'fit-content',
  height: 'fit-content',
  columnGap: '1rem',
}));
