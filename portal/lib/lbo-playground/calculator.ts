export interface LBOParams {
  entryMultiple: number;
  exitMultiple: number;
  leverage: number;
  revenueGrowth: number;
  ebitdaMargin: number;
  marginExpansion: number;
  interestRate: number;
  taxRate: number;
  holdPeriod: number;
  startingEBITDA: number;
}

export interface YearData {
  year: number;
  revenue: number;
  ebitda: number;
  interest: number;
  taxes: number;
  fcf: number;
  debtPaydown: number;
  endingDebt: number;
}

export interface LBOResult {
  entryEV: number;
  entryEquity: number;
  entryDebt: number;
  yearlyData: YearData[];
  exitEBITDA: number;
  exitEV: number;
  exitDebt: number;
  exitEquity: number;
  moic: number;
  irr: number;
}

export const DEFAULT_PARAMS: LBOParams = {
  entryMultiple: 10,
  exitMultiple: 10,
  leverage: 5,
  revenueGrowth: 5,
  ebitdaMargin: 25,
  marginExpansion: 0.5,
  interestRate: 6,
  taxRate: 25,
  holdPeriod: 5,
  startingEBITDA: 100,
};

export const PARAM_RANGES: Record<keyof LBOParams, { min: number; max: number; step: number }> = {
  entryMultiple: { min: 4, max: 15, step: 0.5 },
  exitMultiple: { min: 4, max: 15, step: 0.5 },
  leverage: { min: 1, max: 7, step: 0.5 },
  revenueGrowth: { min: -5, max: 20, step: 0.5 },
  ebitdaMargin: { min: 5, max: 50, step: 1 },
  marginExpansion: { min: -2, max: 3, step: 0.25 },
  interestRate: { min: 2, max: 15, step: 0.25 },
  taxRate: { min: 0, max: 40, step: 1 },
  holdPeriod: { min: 3, max: 7, step: 1 },
  startingEBITDA: { min: 25, max: 500, step: 25 },
};

export const PARAM_LABELS: Record<keyof LBOParams, { label: string; unit: string }> = {
  entryMultiple: { label: 'Entry Multiple', unit: 'x' },
  exitMultiple: { label: 'Exit Multiple', unit: 'x' },
  leverage: { label: 'Leverage (Debt/EBITDA)', unit: 'x' },
  revenueGrowth: { label: 'Revenue Growth', unit: '%' },
  ebitdaMargin: { label: 'EBITDA Margin', unit: '%' },
  marginExpansion: { label: 'Margin Expansion', unit: '%/yr' },
  interestRate: { label: 'Interest Rate', unit: '%' },
  taxRate: { label: 'Tax Rate', unit: '%' },
  holdPeriod: { label: 'Hold Period', unit: 'yrs' },
  startingEBITDA: { label: 'Starting EBITDA', unit: '$M' },
};

export function calculateLBO(params: LBOParams): LBOResult {
  const startingRevenue = params.startingEBITDA / (params.ebitdaMargin / 100);
  const entryEV = params.startingEBITDA * params.entryMultiple;
  const entryDebt = params.startingEBITDA * params.leverage;
  const entryEquity = entryEV - entryDebt;

  if (entryEquity <= 0) {
    return {
      entryEV, entryEquity: 0, entryDebt,
      yearlyData: [], exitEBITDA: 0, exitEV: 0, exitDebt: 0, exitEquity: 0,
      moic: 0, irr: 0,
    };
  }

  let currentDebt = entryDebt;
  let revenue = startingRevenue;
  const yearlyData: YearData[] = [];

  for (let y = 1; y <= params.holdPeriod; y++) {
    revenue *= (1 + params.revenueGrowth / 100);
    const margin = (params.ebitdaMargin + params.marginExpansion * y) / 100;
    const ebitda = revenue * margin;
    const interest = currentDebt * (params.interestRate / 100);
    const ebt = ebitda - interest;
    const taxes = Math.max(0, ebt * (params.taxRate / 100));
    const fcf = ebt - taxes;
    const debtPaydown = Math.min(Math.max(0, fcf), currentDebt);
    currentDebt = Math.max(0, currentDebt - debtPaydown);

    yearlyData.push({ year: y, revenue, ebitda, interest, taxes, fcf, debtPaydown, endingDebt: currentDebt });
  }

  const exitEBITDA = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].ebitda : params.startingEBITDA;
  const exitEV = exitEBITDA * params.exitMultiple;
  const exitDebt = currentDebt;
  const exitEquity = exitEV - exitDebt;

  const moic = exitEquity > 0 ? exitEquity / entryEquity : 0;
  const irr = moic > 0 ? Math.pow(moic, 1 / params.holdPeriod) - 1 : -1;

  return { entryEV, entryEquity, entryDebt, yearlyData, exitEBITDA, exitEV, exitDebt, exitEquity, moic, irr };
}
