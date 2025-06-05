
import React, { useState } from "react";
import SmartTooltip from "./SmartTooltip";
import LifestyleSelector from "./LifestyleSelector";
import { formatCurrency } from "./utils";

interface IncomeGoalsProps {
  data: any;
  updateData: (updates: any) => void;
}

const IncomeGoals = ({ data, updateData }: IncomeGoalsProps) => {
  const [selectedLifestyle, setSelectedLifestyle] = useState('comfortable');
  const [customPercentage, setCustomPercentage] = useState(70);

  const handleCurrencyChange = (value: string, field: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    updateData({ [field]: numericValue });
  };

  const getIncomeReplacementPercentage = () => {
    if (selectedLifestyle === 'custom') {
      return customPercentage;
    }

    switch (selectedLifestyle) {
      case 'essential':
        return 60;
      case 'comfortable':
        return 70;
      case 'enhanced':
        return 80;
      default:
        return 70;
    }
  };

  const targetRetirementIncome = data.desiredIncome * (getIncomeReplacementPercentage() / 100);

  return (
    <div className="step-container p-8">
      <div className="mb-8">
        <h2 className="text-h1 text-brand-primary font-bold mb-4">
          Income Goals & Retirement Planning
        </h2>
        <p className="text-body text-text-secondary">
          Let's determine how much income you'll need in retirement and plan your strategy.
        </p>
      </div>

      <div className="space-y-8">
        {/* Current Income */}
        <div className="input-container">
          <label className="input-label">
            Current Annual Income (before taxes)
            <SmartTooltip content="Your total annual employment income before taxes and deductions. This helps calculate your retirement income needs.">
            </SmartTooltip>
          </label>
          <input
            type="text"
            value={formatCurrency(data.desiredIncome, true)}
            onChange={(e) => handleCurrencyChange(e.target.value, 'desiredIncome')}
            className="form-input input-currency"
            placeholder="$75,000"
          />
        </div>

        {/* Lifestyle Selector */}
        <LifestyleSelector
          selectedLifestyle={selectedLifestyle}
          customPercentage={customPercentage}
          onLifestyleChange={setSelectedLifestyle}
          onCustomPercentageChange={setCustomPercentage}
        />

        {/* Government Benefits Section */}
        <div className="card-surface p-6 rounded-xl">
          <h3 className="text-h3 font-semibold text-brand-primary mb-4">
            Government Benefits
          </h3>
          <p className="text-caption text-text-secondary mb-6">
            We've estimated your government benefits based on current rates. These amounts are automatically calculated.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="font-semibold text-gray-700">Canada Pension Plan (CPP)</div>
                <div className="text-small text-text-muted">Maximum annual benefit</div>
              </div>
              <div className="text-lg font-bold text-brand-primary">
                {formatCurrency(data.cppBenefits)}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="font-semibold text-gray-700">Old Age Security (OAS)</div>
                <div className="text-small text-text-muted">Maximum annual benefit</div>
              </div>
              <div className="text-lg font-bold text-brand-primary">
                {formatCurrency(data.oasBenefits)}
              </div>
            </div>
          </div>
        </div>

        {/* Income Goal Summary */}
        <div className="card-interactive selected p-6 rounded-xl">
          <h3 className="text-h3 font-semibold text-brand-primary mb-4">
            Your Retirement Income Goal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-accent mb-2">
                {getIncomeReplacementPercentage()}%
              </div>
              <div className="text-small text-text-muted">Income Replacement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">
                {formatCurrency(targetRetirementIncome)}
              </div>
              <div className="text-small text-text-muted">Annual Target</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">
                {formatCurrency(targetRetirementIncome / 12)}
              </div>
              <div className="text-small text-text-muted">Monthly Target</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-light-tint rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-brand-primary mb-2">
                Income Gap to Fill with Savings
              </div>
              <div className="text-2xl font-bold text-brand-accent">
                {formatCurrency(Math.max(0, targetRetirementIncome - data.cppBenefits - data.oasBenefits - data.companyPension))}
              </div>
              <div className="text-small text-text-muted mt-1">
                After government benefits and pension
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeGoals;
