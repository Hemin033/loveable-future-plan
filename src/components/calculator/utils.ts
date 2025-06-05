
export const formatCurrency = (amount: number, editing = false): string => {
  if (editing && amount === 0) return "";
  
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseCurrency = (value: string): number => {
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
  return Math.max(0, numericValue);
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const calculateCompoundGrowth = (
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  
  // Future value of initial principal
  const principalGrowth = principal * Math.pow(1 + annualRate, years);
  
  // Future value of monthly contributions (annuity)
  const contributionGrowth = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  
  return principalGrowth + contributionGrowth;
};
