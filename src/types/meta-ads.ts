import { LucideIcon } from 'lucide-react';

export interface RawMetaAdsData {
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

export interface ProcessedTotals {
  alcance: number;
  impressoes: number;
  valorGasto: number;
  frequenciaMedia: number;
}

export interface Demographics {
  idade: Record<string, RawMetaAdsData[]>;
  genero: Record<string, RawMetaAdsData[]>;
  anuncios: Record<string, RawMetaAdsData[]>;
}

export interface Period {
  start: string;
  end: string;
}

export interface ProcessedData {
  totals: ProcessedTotals;
  demographics: Demographics;
  period: Period;
  rawData: RawMetaAdsData[];
}

export interface MetricCardData {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
}

export interface DemographicData {
  name: string;
  value: number;
}

export interface MetricsChartData {
  name: string;
  value: number;
}
