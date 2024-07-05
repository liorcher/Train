import { Button, SxProps, TextField, Typography, styled } from '@mui/material';

export const StepTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
}));

export const StepSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const FormButton = styled(Button)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  color: theme.palette.primary.main,
  borderColor: isSelected ? theme.palette.primary.main : 'unset',
  backgroundColor: isSelected ? theme.palette.secondary.main : theme.palette.info.main,
  height: '30px',
  p: 2,
  width: '100%',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.light,
  height: '30px',
  p: 2,
  borderRadius: '4px',
}));

export default {
  textField: {
    '& .MuiInputBase-root': {
      height: '30px',
      color: 'primary.main',
      fontSize: '13px',
    },
  },
} as Record<string, SxProps>;
