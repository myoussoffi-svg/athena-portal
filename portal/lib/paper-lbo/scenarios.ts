export interface PaperLBOScenario {
  id: string;
  name: string;
  industry: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  description: string;
  prompt: {
    revenue: number;
    ebitda: number;
    ebitdaMargin: number;
    purchaseMultiple: number;
    seniorDebtMultiple: number;
    subDebtMultiple: number;
    seniorRate: number;
    subRate: number;
    revenueGrowth: number;
    marginExpansionBps: number;
    capexPctRevenue: number;
    taxRate: number;
    transactionFeesPct: number;
    financingFeesPct: number;
    exitMultiple: number;
    holdPeriod: number;
  };
}

export interface SolutionStep {
  label: string;
  value: number;
}

export interface PaperLBOSolution {
  sourcesUses: {
    purchasePrice: number;
    transactionFees: number;
    financingFees: number;
    totalUses: number;
    seniorDebt: number;
    subDebt: number;
    totalDebt: number;
    equityContribution: number;
  };
  debtSchedule: {
    years: Array<{
      year: number;
      ebitda: number;
      capex: number;
      interest: number;
      taxes: number;
      fcf: number;
      debtPaydown: number;
      endingDebt: number;
    }>;
  };
  returns: {
    exitEbitda: number;
    exitEV: number;
    remainingDebt: number;
    exitEquity: number;
    moic: number;
    irr: number;
  };
}

function computeSolution(s: PaperLBOScenario['prompt']): PaperLBOSolution {
  const purchasePrice = s.ebitda * s.purchaseMultiple;
  const transactionFees = purchasePrice * s.transactionFeesPct / 100;
  const financingFees = (s.ebitda * (s.seniorDebtMultiple + s.subDebtMultiple)) * s.financingFeesPct / 100;
  const totalUses = purchasePrice + transactionFees + financingFees;
  const seniorDebt = s.ebitda * s.seniorDebtMultiple;
  const subDebt = s.ebitda * s.subDebtMultiple;
  const totalDebt = seniorDebt + subDebt;
  const equityContribution = totalUses - totalDebt;

  let currentSenior = seniorDebt;
  let currentSub = subDebt;
  let revenue = s.revenue;
  let ebitdaMargin = s.ebitdaMargin;
  const years: PaperLBOSolution['debtSchedule']['years'] = [];

  for (let y = 1; y <= s.holdPeriod; y++) {
    revenue *= (1 + s.revenueGrowth / 100);
    ebitdaMargin += s.marginExpansionBps / 100;
    const ebitda = revenue * ebitdaMargin / 100;
    const capex = revenue * s.capexPctRevenue / 100;
    const interest = currentSenior * s.seniorRate / 100 + currentSub * s.subRate / 100;
    const ebt = ebitda - capex - interest;
    const taxes = Math.max(0, ebt * s.taxRate / 100);
    const fcf = ebt - taxes;
    const debtPaydown = Math.min(Math.max(0, fcf), currentSenior + currentSub);

    // Pay down senior first
    const seniorPaydown = Math.min(debtPaydown, currentSenior);
    currentSenior -= seniorPaydown;
    const subPaydown = Math.min(debtPaydown - seniorPaydown, currentSub);
    currentSub -= subPaydown;

    years.push({
      year: y,
      ebitda: Math.round(ebitda * 10) / 10,
      capex: Math.round(capex * 10) / 10,
      interest: Math.round(interest * 10) / 10,
      taxes: Math.round(taxes * 10) / 10,
      fcf: Math.round(fcf * 10) / 10,
      debtPaydown: Math.round((seniorPaydown + subPaydown) * 10) / 10,
      endingDebt: Math.round((currentSenior + currentSub) * 10) / 10,
    });
  }

  const exitEbitda = years[years.length - 1].ebitda;
  const exitEV = exitEbitda * s.exitMultiple;
  const remainingDebt = currentSenior + currentSub;
  const exitEquity = exitEV - remainingDebt;
  const moic = exitEquity / equityContribution;
  const irr = Math.pow(moic, 1 / s.holdPeriod) - 1;

  return {
    sourcesUses: {
      purchasePrice: Math.round(purchasePrice * 10) / 10,
      transactionFees: Math.round(transactionFees * 10) / 10,
      financingFees: Math.round(financingFees * 10) / 10,
      totalUses: Math.round(totalUses * 10) / 10,
      seniorDebt: Math.round(seniorDebt * 10) / 10,
      subDebt: Math.round(subDebt * 10) / 10,
      totalDebt: Math.round(totalDebt * 10) / 10,
      equityContribution: Math.round(equityContribution * 10) / 10,
    },
    debtSchedule: { years },
    returns: {
      exitEbitda: Math.round(exitEbitda * 10) / 10,
      exitEV: Math.round(exitEV * 10) / 10,
      remainingDebt: Math.round(remainingDebt * 10) / 10,
      exitEquity: Math.round(exitEquity * 10) / 10,
      moic: Math.round(moic * 100) / 100,
      irr: Math.round(irr * 1000) / 1000,
    },
  };
}

const SCENARIO_DEFS: Omit<PaperLBOScenario, 'id'>[] = [
  {
    name: 'MedTech Supplies Co.',
    industry: 'Healthcare',
    difficulty: 'basic',
    description: 'Stable medical supplies distributor with predictable cash flows. Straightforward capital structure.',
    prompt: {
      revenue: 500, ebitda: 100, ebitdaMargin: 20,
      purchaseMultiple: 8, seniorDebtMultiple: 4, subDebtMultiple: 1.5,
      seniorRate: 5, subRate: 10,
      revenueGrowth: 3, marginExpansionBps: 0,
      capexPctRevenue: 3, taxRate: 25,
      transactionFeesPct: 2, financingFeesPct: 1,
      exitMultiple: 8, holdPeriod: 5,
    },
  },
  {
    name: 'CloudSync Software',
    industry: 'Technology',
    difficulty: 'basic',
    description: 'B2B SaaS company with high margins and strong growth. Lower leverage due to limited assets.',
    prompt: {
      revenue: 200, ebitda: 60, ebitdaMargin: 30,
      purchaseMultiple: 12, seniorDebtMultiple: 3, subDebtMultiple: 1,
      seniorRate: 6, subRate: 11,
      revenueGrowth: 8, marginExpansionBps: 50,
      capexPctRevenue: 2, taxRate: 25,
      transactionFeesPct: 2, financingFeesPct: 1,
      exitMultiple: 12, holdPeriod: 5,
    },
  },
  {
    name: 'Precision Manufacturing Inc.',
    industry: 'Industrials',
    difficulty: 'intermediate',
    description: 'Specialty manufacturer with cyclical revenues. Higher leverage supported by asset base.',
    prompt: {
      revenue: 800, ebitda: 120, ebitdaMargin: 15,
      purchaseMultiple: 9, seniorDebtMultiple: 4.5, subDebtMultiple: 1.5,
      seniorRate: 5.5, subRate: 10.5,
      revenueGrowth: 4, marginExpansionBps: 25,
      capexPctRevenue: 5, taxRate: 25,
      transactionFeesPct: 2.5, financingFeesPct: 1.5,
      exitMultiple: 9, holdPeriod: 5,
    },
  },
  {
    name: 'FreshBite Food Group',
    industry: 'Consumer',
    difficulty: 'intermediate',
    description: 'Regional food & beverage platform with bolt-on acquisition strategy. Moderate growth.',
    prompt: {
      revenue: 600, ebitda: 90, ebitdaMargin: 15,
      purchaseMultiple: 10, seniorDebtMultiple: 4, subDebtMultiple: 2,
      seniorRate: 5, subRate: 9.5,
      revenueGrowth: 5, marginExpansionBps: 50,
      capexPctRevenue: 4, taxRate: 25,
      transactionFeesPct: 2, financingFeesPct: 1,
      exitMultiple: 10.5, holdPeriod: 5,
    },
  },
  {
    name: 'Vertex Financial Services',
    industry: 'Financial Services',
    difficulty: 'advanced',
    description: 'Insurance services platform with complex capital structure. High entry multiple, multiple expansion thesis.',
    prompt: {
      revenue: 400, ebitda: 80, ebitdaMargin: 20,
      purchaseMultiple: 11, seniorDebtMultiple: 3.5, subDebtMultiple: 2,
      seniorRate: 6, subRate: 11,
      revenueGrowth: 6, marginExpansionBps: 75,
      capexPctRevenue: 2, taxRate: 25,
      transactionFeesPct: 2.5, financingFeesPct: 1.5,
      exitMultiple: 12, holdPeriod: 5,
    },
  },
  {
    name: 'GreenField Infrastructure',
    industry: 'Infrastructure',
    difficulty: 'advanced',
    description: 'Waste management & environmental services. High leverage capacity, steady FCF, margin improvement opportunity.',
    prompt: {
      revenue: 1000, ebitda: 200, ebitdaMargin: 20,
      purchaseMultiple: 10, seniorDebtMultiple: 5, subDebtMultiple: 1.5,
      seniorRate: 5.5, subRate: 10,
      revenueGrowth: 3, marginExpansionBps: 100,
      capexPctRevenue: 6, taxRate: 25,
      transactionFeesPct: 2, financingFeesPct: 1.5,
      exitMultiple: 11, holdPeriod: 5,
    },
  },
];

export const PAPER_LBO_SCENARIOS: (PaperLBOScenario & { solution: PaperLBOSolution })[] =
  SCENARIO_DEFS.map((def, i) => {
    const scenario: PaperLBOScenario = { ...def, id: `scenario-${i + 1}` };
    return { ...scenario, solution: computeSolution(scenario.prompt) };
  });
