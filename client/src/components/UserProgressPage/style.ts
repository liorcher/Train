import { SxProps } from '@mui/material';

const loadingText: SxProps = {
  '&::after': {
    content: '"..."',
    display: 'inline-block',
    animation: 'l 1s steps(4) infinite',
    clipPath: 'inset(0 2ch 0 0)',
  },
};

export default {
  loadingText,
};
