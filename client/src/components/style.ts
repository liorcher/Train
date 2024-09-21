import { Button, styled } from '@mui/material';

export const FormActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.primary.contrastText,
  width: 'fit-content',
  height: 'fit-content',
  columnGap: '1rem',
}));

export default {
  numericInput: {
    '& .MuiInputBase-root': {
      border: '1px solid white',
      height: '30px',
      color: 'white',
      fontSize: '13px',
    },
  },
};
