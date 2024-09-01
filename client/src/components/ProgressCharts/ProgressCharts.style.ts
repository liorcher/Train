import { SxProps, Theme } from '@mui/material';
import { gaugeClasses } from '@mui/x-charts/Gauge';

const gauge: (theme: Theme) => {
  [x: string]:
    | string
    | { fontSize: number; text: { fill: string }; fill?: undefined }
    | { fill: string; fontSize?: undefined; text?: undefined };
  width: string;
  height: string;
} = (theme: Theme) => ({
  width: '20vw',
  height: '45vh',
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 40,
    text: { fill: theme.palette.secondary.light },
  },
  [`& .${gaugeClasses.valueArc}`]: {
    fill: theme.palette.error.main,
  },
  [`& .${gaugeClasses.referenceArc}`]: {
    fill: theme.palette.secondary.dark,
  },
});

const title: SxProps = {
  color: 'secondary.light',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '30px',
};

export default {
  gauge,
  title,
};
