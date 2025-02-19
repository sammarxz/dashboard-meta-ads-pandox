import { LucideIcon } from 'lucide-react';

export interface MetaAdsData {
  'Nome da conta': string;
  Idade: string;
  Gênero: string;
  Anúncios: string;
  Alcance: number;
  Impressões: number;
  Frequência: number;
  Moeda: string;
  'Valor usado (BRL)': number;
  'Configuração de atribuição': string;
  'Início dos relatórios': string;
  'Término dos relatórios': string;
}

export interface MetricsChartData {
  name: string;
  value: number;
}

export interface DemographicData {
  category: string;
  value: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
}
