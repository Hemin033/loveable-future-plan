
import React from "react";
import { RetirementData } from "./types";
import MetricCard from "./MetricCard";

interface ResultsProps {
  data: RetirementData;
}

const Results = ({ data }: ResultsProps) => {
  // Enhanced calculation logic
  const yearsInRetirement = 25;
  const totalExpectedIncome = data.cppBenefits + data.oasBenefits + data.companyPension + data.additionalIncome;
  const incomeFromSavingsNeeded = Math.max(0, data.desiredIncome - totalExpectedIncome);
  const savingsGoal = incomeFromSavingsNeeded * yearsInRetirement / 0.04;

  const yearsToRetirement = Math.max(1, data.retirementAge - data.currentAge);
  const currentSavings = data.rrspBalance + data.tfsaBalance + data.otherSavings + data.nonRegisteredSavings;
  const futureValueCurrentSavings = currentSavings * Math.pow(1 + data.expectedReturn, yearsToRetirement);
  const annualContributions = data.monthlyContributions * 12;
  
  const futureValueContributions = annualContributions > 0 ? 
    annualContributions * ((Math.pow(1 + data.expectedReturn, yearsToRetirement) - 1) / data.expectedReturn) : 0;
  
  const projectedSavings = futureValueCurrentSavings + futureValueContributions;
  const shortfall = Math.max(0, savingsGoal - projectedSavings);
  
  const additionalMonthlySavings = shortfall > 0 && yearsToRetirement > 0 ? 
    (shortfall * data.expectedReturn) / (12 * (Math.pow(1 + data.expectedReturn, yearsToRetirement) - 1)) : 0;

  const readinessScore = savingsGoal > 0 ? Math.min(100, Math.round((projectedSavings / savingsGoal) * 100)) : 100;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! You're on track for a comfortable retirement.";
    if (score >= 60) return "Good progress, but consider increasing your savings.";
    return "Let's create a plan to get you on track for retirement.";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "from-success/10 to-success/5";
    if (score >= 60) return "from-warning/10 to-warning/5";
    return "from-error/10 to-error/5";
  };

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-h1 text-text-primary">Your Retirement Plan</h2>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Here's your personalized retirement analysis with specific recommendations to achieve your goals.
        </p>
      </div>

      {/* Readiness Score Hero */}
      <div className={`bg-gradient-to-r ${getScoreBgColor(readinessScore)} rounded-2xl p-8 text-center border-2 ${
        readinessScore >= 80 ? 'border-success/20' : 
        readinessScore >= 60 ? 'border-warning/20' : 'border-error/20'
      }`}>
        <div className="relative inline-block mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(229, 231, 235)" strokeWidth="8"/>
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              stroke={readinessScore >= 80 ? "rgb(16, 185, 129)" : 
                     readinessScore >= 60 ? "rgb(245, 158, 11)" : "rgb(239, 68, 68)"}
              strokeWidth="8"
              strokeDasharray={`${readinessScore * 3.14} 314`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(readinessScore)}`}>
              {readinessScore}%
            </span>
          </div>
        </div>
        <h3 className="text-h2 text-text-primary mb-2">Retirement Readiness Score</h3>
        <p className="text-body text-text-secondary max-w-lg mx-auto">{getScoreMessage(readinessScore)}</p>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          value={savingsGoal}
          label="Savings Goal"
          format="currency"
          trend="neutral"
        />
        <MetricCard
          value={projectedSavings}
          label="Projected Savings"
          format="currency"
          trend={projectedSavings >= savingsGoal ? "positive" : "negative"}
        />
        <MetricCard
          value={shortfall}
          label="Savings Shortfall"
          format="currency"
          trend={shortfall > 0 ? "negative" : "positive"}
        />
        <MetricCard
          value={additionalMonthlySavings}
          label="Additional Monthly Savings"
          format="currency"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Detailed Analysis */}
        <div className="space-y-6">
          <h3 className="text-h2 text-text-primary">Savings Analysis</h3>
          
          <div className="card-surface space-y-4">
            <h4 className="text-h3 text-primary-brand">Your Savings Goal</h4>
            <p className="text-body text-text-secondary">
              To generate ${incomeFromSavingsNeeded.toLocaleString()} annually from your savings, you'll need approximately{" "}
              <span className="font-semibold text-text-primary">${savingsGoal.toLocaleString()}</span> by retirement.
            </p>
            <div className="text-caption text-text-muted">
              * Based on the 4% withdrawal rule and 25-year retirement period
            </div>
          </div>

          <div className="card-surface space-y-4">
            <h4 className="text-h3 text-primary-brand">Your Projection</h4>
            <p className="text-body text-text-secondary">
              With your current savings of ${currentSavings.toLocaleString()} and monthly contributions of{" "}
              ${data.monthlyContributions.toLocaleString()}, you're projected to have{" "}
              <span className="font-semibold text-text-primary">${projectedSavings.toLocaleString()}</span> by retirement.
            </p>
            <div className="text-caption text-text-muted">
              * Assumes {(data.expectedReturn * 100).toFixed(1)}% annual return over {yearsToRetirement} years
            </div>
          </div>

          {shortfall > 0 && (
            <div className="card-surface space-y-4 border-l-4 border-warning">
              <h4 className="text-h3 text-warning">Action Required</h4>
              <p className="text-body text-text-secondary">
                To reach your goal, consider increasing your monthly savings by{" "}
                <span className="font-semibold text-warning">${additionalMonthlySavings.toLocaleString()}</span>.
              </p>
              <div className="bg-warning/10 rounded-lg p-3">
                <p className="text-caption text-warning font-medium">
                  💡 Alternative: Consider working 2-3 years longer or adjusting your retirement income goal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Income Breakdown */}
        <div className="space-y-6">
          <h3 className="text-h2 text-text-primary">Retirement Income Sources</h3>
          
          <div className="card-surface space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-body text-text-secondary">CPP/QPP Benefits</span>
              <span className="text-body font-semibold">${(data.cppBenefits / 12).toLocaleString()}/month</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-body text-text-secondary">OAS Benefits</span>
              <span className="text-body font-semibold">${(data.oasBenefits / 12).toLocaleString()}/month</span>
            </div>
            {data.companyPension > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-body text-text-secondary">Company Pension</span>
                <span className="text-body font-semibold">${(data.companyPension / 12).toLocaleString()}/month</span>
              </div>
            )}
            {data.additionalIncome > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-body text-text-secondary">Additional Income</span>
                <span className="text-body font-semibold">${(data.additionalIncome / 12).toLocaleString()}/month</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-body text-text-secondary">From Personal Savings</span>
              <span className="text-body font-semibold">${(incomeFromSavingsNeeded / 12).toLocaleString()}/month</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-primary-brand/5 rounded-lg px-4">
              <span className="text-h3 text-text-primary font-semibold">Total Monthly Income</span>
              <span className="text-h3 font-bold text-primary-brand">${(data.desiredIncome / 12).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="card-surface space-y-6">
        <h3 className="text-h2 text-text-primary">Your Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-h3 text-primary-brand">Immediate Steps</h4>
            <div className="space-y-3">
              {additionalMonthlySavings > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-brand rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-text-secondary">
                    Increase monthly savings by <strong>${additionalMonthlySavings.toLocaleString()}</strong> to reach your goal
                  </p>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-brand rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body text-text-secondary">
                  Maximize your RRSP and TFSA contributions first for tax advantages
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-brand rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body text-text-secondary">
                  Set up automatic monthly contributions to stay on track
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-h3 text-success">Long-term Strategy</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body text-text-secondary">
                  Review and rebalance your investment portfolio annually
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body text-text-secondary">
                  Consider consulting with a fee-only financial advisor
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body text-text-secondary">
                  Reassess your plan annually or after major life changes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
