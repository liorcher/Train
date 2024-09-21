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
  width: '15vw',
  height: '18vh',
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 20,
    text: { fill: theme.palette.secondary.light },
  },
  [`& .${gaugeClasses.valueArc}`]: {
    fill: theme.palette.info.main,
  },
  [`& .${gaugeClasses.referenceArc}`]: {
    fill: theme.palette.secondary.light,
  },
});

const title: SxProps = {
  color: 'secondary.light',
  textAlign: 'center',
  fontWeight: 'bold',
};

export default {
  gauge,
  title,
};
