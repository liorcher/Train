import { Gauge } from '@mui/x-charts/Gauge';
import { Chart } from '@/types/chart.type';
import { Grid, Typography } from '@mui/material';
import Styles from './ProgressCharts.style';

interface Props {
  charts: Chart[];
}

const ProgressCharts: React.FC<Props> = ({ charts }) => {
  const gaugeSettings = (chart: Chart) => ({
    value: chart.data,
    cornerRadius: '50%',
    sx: Styles.gauge,
    text: `${chart.data}${chart.isPrecentage ? '%' : ''}`,
  });

  return (
    <Grid container direction='row' alignItems={'center'} wrap='nowrap' columnGap={'5rem'}>
      {charts.map((chart, index) => (
        <Grid
          container
          item
          key={index}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
        >
          <Gauge {...gaugeSettings(chart)} />
          <Typography variant='h5' sx={Styles.title}>
            {chart.title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProgressCharts;
