import { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from 'recharts';
import _ from 'lodash';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/utils/format';
import { Demographics } from '@/types/meta-ads';

const COLORS = [
  '#4f46e5',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-medium">{label}</p>
        <p>Alcance: {formatNumber(payload[0].value as number)}</p>
      </div>
    );
  }
  return null;
};

interface DemographicChartsProps {
  demographics: Demographics;
}

export const DemographicCharts: FC<DemographicChartsProps> = ({
  demographics,
}) => {
  // Processamento dos dados por idade
  const ageData = Object.entries(demographics.idade)
    .map(([age, data]) => ({
      name: age,
      value: _.sumBy(data, 'Alcance'),
    }))
    .sort((a, b) => {
      // Ordenar por faixa etária
      const getAge = (str: string) => parseInt(str.split('-')[0]);
      return getAge(a.name) - getAge(b.name);
    });

  // Processamento dos dados por gênero
  const genderData = Object.entries(demographics.genero).map(([gender, data]) => ({
    name:
      gender === 'female'
        ? 'Feminino'
        : gender === 'male'
        ? 'Masculino'
        : 'Não informado',
    value: _.sumBy(data, 'Alcance'),
  }));

  // Processamento dos dados por tipo de anúncio
  const adTypeData = Object.entries(demographics.anuncios)
    .map(([type, data]) => ({
      name: type.length > 30 ? type.substring(0, 27) + '...' : type,
      fullName: type,
      value: _.sumBy(data, 'Alcance'),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  interface CustomAdTooltipProps extends TooltipProps<any, any> {
    payload?: any[];
    label?: string;
  }

  const CustomAdTooltip: FC<CustomAdTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = adTypeData.find((item) => item.name === label);
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-medium">{data?.fullName}</p>
          <p>Alcance: {formatNumber(payload[0].value as number)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Análise Demográfica</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Idade</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Gênero</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Tipos de Anúncios</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<CustomAdTooltip />} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};