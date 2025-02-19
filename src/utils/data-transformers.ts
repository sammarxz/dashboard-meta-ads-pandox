import { ProcessedTotals, MetricsChartData } from '../types/meta-ads';

export const transformToChartData = (
  data: ProcessedTotals
): MetricsChartData[] => [
  {
    name: 'Alcance',
    value: data.alcance,
  },
  {
    name: 'Impressões',
    value: data.impressoes,
  },
];
