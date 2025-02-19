import { FC } from 'react';
import {
  Lightbulb,
  Target,
  DollarSign,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ProcessedTotals } from '@/types/meta-ads';

import { formatNumber, formatCurrency } from '@/utils/format';

interface InsightCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  interpretation: string;
  impact: string;
}

const InsightCard: FC<InsightCardProps> = ({
  title,
  description,
  icon: Icon,
  interpretation,
  impact,
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium text-indigo-600 flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm font-medium mb-2">{description}</p>
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">O que isso significa: </span>
          {interpretation}
        </div>
        <div className="text-sm text-green-600">
          <span className="font-semibold">Impacto no negócio: </span>
          {impact}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface CampaignInsightsProps {
  data: ProcessedTotals;
}

export const CampaignInsights: FC<CampaignInsightsProps> = ({ data }) => {
  const dailyReach = Math.round(data.alcance / 19);
  const investmentPerDay = data.valorGasto / 19;
  const viewsPerPerson = data.frequenciaMedia;

  const insights = [
    {
      title: 'Alcance Diário Consistente',
      description: `Em média, ${formatNumber(
        dailyReach
      )} pessoas novas viram sua marca todos os dias`,
      icon: Target,
      interpretation:
        'Sua marca está sendo apresentada a um público novo e relevante de forma constante.',
      impact:
        'Maior visibilidade e lembrança da marca, aumentando as chances de vendas futuras.',
    },
    {
      title: 'Exposição Otimizada',
      description: `Cada pessoa viu seus anúncios em média ${viewsPerPerson.toFixed(
        1
      )} vezes`,
      icon: TrendingUp,
      interpretation: 'A frequência está bem equilibrada, evitando saturação.',
      impact: 'Melhor memorização da marca sem desperdiçar orçamento.',
    },
    {
      title: 'Investimento Estratégico',
      description: `Investimento médio de ${formatCurrency(
        investmentPerDay
      )} por dia`,
      icon: DollarSign,
      interpretation:
        'Orçamento distribuído de forma inteligente ao longo do tempo.',
      impact: 'Maior previsibilidade e controle sobre os resultados.',
    },
    {
      title: 'Potencial de Alcance',
      description: `${formatNumber(
        data.impressoes
      )} visualizações totais dos seus anúncios`,
      icon: Lightbulb,
      interpretation: 'Suas mensagens estão gerando interesse e engajamento.',
      impact: 'Maior reconhecimento da marca e possibilidade de conversões.',
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Insights da Campanha</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumo dos Benefícios</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>
                Visibilidade constante da marca, atingindo{' '}
                {formatNumber(data.alcance)} pessoas em 19 dias
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>
                Gestão profissional do orçamento, garantindo que cada real seja
                investido de forma estratégica
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>
                Frequência controlada de {viewsPerPerson.toFixed(1)}{' '}
                visualizações por pessoa, ideal para fixação da marca
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>
                Monitoramento constante e ajustes para maximizar os resultados
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
