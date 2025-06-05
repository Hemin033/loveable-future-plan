
import React from "react";
import { RetirementData } from "./types";
import ExplanationCard from "./ExplanationCard";

interface ResultsProps {
  data: RetirementData;
}

const Results = ({ data }: ResultsProps) => {
  // Calculate savings goal
  const yearsInRetirement = 25; // Assume 25 years in retirement
  const totalExpectedIncome = data.cppBenefits + data.oasBenefits + data.companyPension + data.additionalIncome;
  const incomeFromSavingsNeeded = Math.max(0, data.desiredIncome - totalExpectedIncome);
  const savingsGoal = incomeFromSavingsNeeded * yearsInRetirement / 0.04; // 4% withdrawal rule

  // Calculate projected savings
  const yearsToRetirement = data.retirementAge - data.currentAge;
  const currentSavings = data.rrspBalance + data.tfsaBalance + data.otherSavings + data.nonRegisteredSavings;
  const futureValueCurrentSavings = currentSavings * Math.pow(1 + data.expectedReturn, yearsToRetirement);
  const futureValueContributions = data.monthlyContributions * 12 * 
    ((Math.pow(1 + data.expectedReturn, yearsToRetirement) - 1) / data.expectedReturn);
  const projectedSavings = futureValueCurrentSavings + futureValueContributions;

  // Calculate shortfall and additional monthly savings needed
  const shortfall = Math.max(0, savingsGoal - projectedSavings);
  const additionalMonthlySavings = shortfall > 0 ? 
    (shortfall * data.expectedReturn) / (12 * (Math.pow(1 + data.expectedReturn, yearsToRetirement) - 1)) : 0;

  // Calculate readiness score
  const readinessScore = Math.min(100, Math.round((projectedSavings / savingsGoal) * 100));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "You're on track for a comfortable retirement!";
    if (score >= 50) return "You're making progress, but consider increasing savings.";
    return "Additional planning needed to reach your retirement goals.";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h1 text-brand-secondary">Your Retirement Plan</h2>
        <p className="text-body text-text-secondary">
          Here's a personalized analysis of your retirement readiness and recommendations.
        </p>
      </div>

      {/* Readiness Score */}
      <div className="card-surface text-center space-y-4">
        <div className="relative inline-block">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(229, 233, 240)" strokeWidth="8"/>
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              stroke="rgb(23, 179, 228)" 
              strokeWidth="8"
              strokeDasharray={`${readinessScore * 3.14} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(readinessScore)}`}>
              {readinessScore}%
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-h2 text-brand-secondary">Retirement Readiness Score</h3>
          <p className="text-body text-text-secondary">{getScoreMessage(readinessScore)}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface text-center">
          <div className="text-h2 text-brand-primary font-semibold">
            {formatCurrency(savingsGoal)}
          </div>
          <div className="text-caption text-text-secondary">
            Savings Goal
          </div>
        </div>
        <div className="card-surface text-center">
          <div className="text-h2 text-text-secondary font-semibold">
            {formatCurrency(projectedSavings)}
          </div>
          <div className="text-caption text-text-secondary">
            Projected Savings
          </div>
        </div>
        <div className="card-surface text-center">
          <div className="text-h2 text-brand-secondary font-semibold">
            {formatCurrency(shortfall)}
          </div>
          <div className="text-caption text-text-secondary">
            Savings Shortfall
          </div>
        </div>
        <div className="card-surface text-center">
          <div className="text-h2 text-brand-primary font-semibold">
            {formatCurrency(additionalMonthlySavings)}
          </div>
          <div className="text-caption text-text-secondary">
            Additional Monthly Savings
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-h2 text-brand-secondary">Savings Breakdown</h3>
          
          <ExplanationCard
            title="Your Savings Goal"
            explanation={`This is the total amount you should aim to have saved by your retirement date to fund your desired retirement lifestyle, based on your inputs and our calculations.`}
            thingsToConsider="This goal assumes average life expectancy and investment returns. Consider saving extra as a buffer against living longer than expected, market downturns, or unexpected expenses."
          />

          <ExplanationCard
            title="Projected Savings"
            explanation={`This is how much we estimate you'll have saved by retirement if you continue with your current savings rate and investment strategy.`}
            thingsToConsider="This projection is based on average returns over time. Actual results may vary due to market fluctuations, especially near your retirement date."
          />

          {shortfall > 0 && (
            <ExplanationCard
              title="Savings Shortfall"
              explanation={`This is the gap between your savings goal and your projected savings at retirement. It represents additional savings needed to reach your retirement income goal.`}
              thingsToConsider="If you have a shortfall, you have several options: increase your monthly savings, adjust your retirement date, modify your retirement income expectations, or plan for a more aggressive investment strategy."
            />
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-h2 text-brand-secondary">Income Sources</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border-color">
              <span className="text-body text-text-secondary">CPP/QPP Benefits</span>
              <span className="text-body font-medium">{formatCurrency(data.cppBenefits)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border-color">
              <span className="text-body text-text-secondary">OAS Benefits</span>
              <span className="text-body font-medium">{formatCurrency(data.oasBenefits)}</span>
            </div>
            {data.companyPension > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border-color">
                <span className="text-body text-text-secondary">Company Pension</span>
                <span className="text-body font-medium">{formatCurrency(data.companyPension)}</span>
              </div>
            )}
            {data.additionalIncome > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border-color">
                <span className="text-body text-text-secondary">Additional Income</span>
                <span className="text-body font-medium">{formatCurrency(data.additionalIncome)}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-border-color">
              <span className="text-body text-text-secondary">From Personal Savings</span>
              <span className="text-body font-medium">{formatCurrency(incomeFromSavingsNeeded)}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-surface rounded px-3">
              <span className="text-h3 text-brand-secondary">Total Annual Income</span>
              <span className="text-h3 font-semibold">{formatCurrency(data.desiredIncome)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-surface space-y-4">
        <h3 className="text-h2 text-brand-secondary">Next Steps</h3>
        <div className="space-y-3">
          {additionalMonthlySavings > 0 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-body">
                Consider increasing your monthly savings by <strong>{formatCurrency(additionalMonthlySavings)}</strong> to reach your retirement goal.
              </p>
            </div>
          )}
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-body">
              Review and optimize your investment allocation to ensure it matches your risk tolerance and time horizon.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-body">
              Consider consulting with a financial advisor to create a comprehensive retirement plan.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-body">
              Review your plan annually and adjust as your income, expenses, and goals change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
