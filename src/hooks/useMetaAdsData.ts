import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';

import { RawMetaAdsData, ProcessedData } from '@/types/meta-ads';

export const useMetaAdsData = () => {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/relatorio-pandox-fev-1-2025-a-fev-19-2025.csv'
        );
        const csvText = await response.text();

        const result = Papa.parse<RawMetaAdsData>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        if (result.data.length > 0) {
          const rawData = result.data;

          // Remover a linha de totais (primeira linha)
          const dataWithoutTotals = rawData.slice(1);

          const processedData: ProcessedData = {
            totals: {
              alcance: _.sumBy(dataWithoutTotals, 'Alcance'),
              impressoes: _.sumBy(dataWithoutTotals, 'Impressões'),
              valorGasto: _.sumBy(dataWithoutTotals, 'Valor usado (BRL)'),
              frequenciaMedia: _.meanBy(dataWithoutTotals, 'Frequência'),
            },
            demographics: {
              idade: _.groupBy(
                dataWithoutTotals.filter((row: RawMetaAdsData) => row.Idade),
                'Idade'
              ),
              genero: _.groupBy(
                dataWithoutTotals.filter((row: RawMetaAdsData) => row.Gênero),
                'Gênero'
              ),
              anuncios: _.groupBy(
                dataWithoutTotals.filter((row: RawMetaAdsData) => row.Anúncios),
                'Anúncios'
              ),
            },
            period: {
              start: dataWithoutTotals[0]['Início dos relatórios'],
              end: dataWithoutTotals[0]['Término dos relatórios'],
            },
            rawData: dataWithoutTotals,
          };
          setData(processedData);
        } else {
          throw new Error('Dados não encontrados no arquivo CSV');
        }
      } catch (err) {
        console.error('Erro original:', err);
        setError(
          err instanceof Error ? err : new Error('Erro ao carregar dados')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};