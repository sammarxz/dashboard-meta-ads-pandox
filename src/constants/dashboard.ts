import { Users, Eye, Repeat, DollarSign } from 'lucide-react';

import { MetricCardData } from '@/types/meta-ads';
import { formatNumber, formatCurrency } from '@/utils/format';

interface Totals {
  alcance: number;
  impressoes: number;
  valorGasto: number;
  frequenciaMedia: number;
}

export const getMetricCards = (totals: Totals): MetricCardData[] => [
  {
    title: 'Alcance',
    value: formatNumber(totals.alcance),
    icon: Users,
    description: 'Número de pessoas alcançadas',
  },
  {
    title: 'Impressões',
    value: formatNumber(totals.impressoes),
    icon: Eye,
    description: 'Total de vezes que os anúncios foram exibidos',
  },
  {
    title: 'Frequência',
    value: totals.frequenciaMedia.toFixed(2),
    icon: Repeat,
    description: 'Média de vezes que cada pessoa viu os anúncios',
  },
  {
    title: 'Investimento',
    value: formatCurrency(totals.valorGasto),
    icon: DollarSign,
    description: 'Valor total investido',
  },
];
