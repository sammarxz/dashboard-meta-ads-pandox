export const calculateCPM = (value: number, impressions: number): number =>
  (value / impressions) * 1000;

export const calculateCPR = (value: number, reach: number): number =>
  (value / reach) * 1000;
