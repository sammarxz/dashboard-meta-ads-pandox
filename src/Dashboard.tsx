import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { MetricCard } from '@/components/metric-card';
import { DashboardHeader } from '@/components/dashboard-header';
import { CampaignInsights } from '@/components/campaign-insights';
import { DemographicCharts } from '@/components/demographic-charts';
import { useMetaAdsData } from '@/hooks/useMetaAdsData';
import { formatCurrency } from '@/utils/format';

// Importando os utilitários
import { transformToChartData } from '@/utils/data-transformers';
import { calculateCPM, calculateCPR } from '@/utils/calculations';
import { getMetricCards } from '@/constants/dashboard';

const Dashboard = () => {
  const { data, isLoading, error } = useMetaAdsData();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados: {error.message}</div>;
  if (!data) return <div>Nenhum dado encontrado</div>;

  const { totals, demographics, period } = data;

  // Usando o transformToChartData para o gráfico de barras
  const metricsData = transformToChartData(totals);

  // Usando os cálculos de CPM e CPR
  const cpmCalculado = calculateCPM(totals.valorGasto, totals.impressoes);
  const cprCalculado = calculateCPR(totals.valorGasto, totals.alcance);

  return (
    <div className="p-4 space-y-6 bg-gray-50 rounded-lg">
      <DashboardHeader period={period} />

      {/* Métricas Principais */}
      <div>
        <h2 className="text-xl font-bold mb-4">Métricas Principais</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {getMetricCards(totals).map((card, index) => (
            <MetricCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Gráficos e Métricas de Custo */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Comparativo Alcance vs Impressões</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Custo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">
                  CPM (Custo por 1000 impressões)
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(cpmCalculado)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">
                  CPR (Custo por 1000 pessoas alcançadas)
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(cprCalculado)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Demográfica */}
      <DemographicCharts demographics={demographics} />

      {/* Insights da Campanha */}
      <CampaignInsights data={totals} />
    </div>
  );
};

export default Dashboard;
