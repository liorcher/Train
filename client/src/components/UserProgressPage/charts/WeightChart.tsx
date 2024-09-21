import Loader from '@/components/Loader';
import ProgressCharts from '@/components/ProgressCharts/ProgressCharts';
import { useAuth, usePreferencesContext } from '@/contexts';
import { Chart } from '@/types/chart.type';
import { getWeightProgressPercentage, isLosingWeight } from '@/utils';

export const WeightChart = () => {
  const { currentUser } = useAuth();
  const { preferences } = usePreferencesContext();

  if (!currentUser || !preferences) return <Loader />;

  const lastWeight = currentUser.weightsProgress.length
    ? currentUser.weightsProgress[currentUser.weightsProgress.length - 1]
    : currentUser.weight;

  const weightProgress = Math.floor(
    getWeightProgressPercentage(currentUser.weight, preferences.targetWeight, lastWeight)
  );

  const chart: Chart[] = [
    {
      title: `Weight ${
        isLosingWeight(currentUser.weight, preferences.targetWeight) ? 'Loss' : 'Gain'
      }`,
      data: weightProgress,
      isPrecentage: true,
    },
  ];

  return <ProgressCharts charts={chart} />;
};
