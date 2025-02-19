export const formatNumber = (num: number): string =>
  new Intl.NumberFormat('pt-BR').format(num);

export const formatCurrency = (num: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
