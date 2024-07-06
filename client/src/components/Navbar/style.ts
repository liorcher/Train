import { Button, styled } from '@mui/material';

export const NavbarButton = styled(Button)({
  borderRadius: '15px',
});

export const SignInButton = styled(NavbarButton)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
}));

export const SignUpButton = styled(NavbarButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));
