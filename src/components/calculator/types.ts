
export interface CalculatorData {
  // Step 1: About You
  currentAge: number;
  retirementAge: number;
  province: string;
  maritalStatus: string;
  
  // Step 2: Current Savings
  rrspBalance: number;
  tfsaBalance: number;
  pensionValue: number;
  otherSavings: number;
  monthlyContributions: number;
  
  // Step 3: Income & Goals
  annualIncome: number;
  incomeGrowth: number;
  retirementIncomePercent: number;
  expectedCPP: number;
  expectedOAS: number;
  riskTolerance: "conservative" | "moderate" | "aggressive";
}

export interface RetirementResults {
  savingsAtRetirement: number;
  monthlyIncomeNeeded: number;
  monthlyGovernmentBenefits: number;
  yearsMoneyWillLast: number;
  sustainability: "good" | "needs-improvement" | "insufficient";
  tips: string[];
}
