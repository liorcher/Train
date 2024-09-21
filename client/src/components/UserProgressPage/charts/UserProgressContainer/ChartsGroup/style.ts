import { SxProps, Theme } from '@mui/material';

export default {
  groupContainer: {
    backgroundColor: 'secondary.dark',
    borderRadius: 4,
    p: 3,
  },
} as const satisfies SxProps<Theme>;
