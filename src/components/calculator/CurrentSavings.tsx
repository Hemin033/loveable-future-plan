import React from "react";
import SmartTooltip from "./SmartTooltip";
import CompanyPensionSelector from "./CompanyPensionSelector";
import ReturnRateSelector from "./ReturnRateSelector";
import { formatCurrency } from "./utils";

interface CurrentSavingsProps {
  data: any;
  updateData: (updates: any) => void;
}

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const handleCurrencyChange = (value: string, field: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    updateData({ [field]: numericValue });
  };

  const totalSavings = (data.rrspBalance || 0) + (data.tfsaBalance || 0) + 
                      (data.nonRegisteredSavings || 0) + (data.otherSavings || 0);

  return (
    <div className="step-container p-8">
      <div className="mb-8">
        <h2 className="text-h1 text-brand-primary font-bold mb-4">
          Current Savings & Investments
        </h2>
        <p className="text-body text-text-secondary">
          Tell us about your existing retirement savings. This helps us calculate how much more you need to save.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RRSP Balance */}
          <div className="input-container">
            <label className="input-label">
              RRSP Balance
              <SmartTooltip content="Your Registered Retirement Savings Plan balance. RRSPs offer tax deductions now and tax-deferred growth until withdrawal.">
              </SmartTooltip>
            </label>
            <input
              type="text"
              value={formatCurrency(data.rrspBalance, true)}
              onChange={(e) => handleCurrencyChange(e.target.value, 'rrspBalance')}
              className="form-input input-currency"
              placeholder="$50,000"
            />
          </div>

          {/* TFSA Balance */}
          <div className="input-container">
            <label className="input-label">
              TFSA Balance
              <SmartTooltip content="Your Tax-Free Savings Account balance. TFSAs offer tax-free growth and withdrawals, with flexible contribution room.">
              </SmartTooltip>
            </label>
            <input
              type="text"
              value={formatCurrency(data.tfsaBalance, true)}
              onChange={(e) => handleCurrencyChange(e.target.value, 'tfsaBalance')}
              className="form-input input-currency"
              placeholder="$25,000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Non-Registered Savings */}
          <div className="input-container">
            <label className="input-label">
              Non-Registered Investments
              <SmartTooltip content="Investments in taxable accounts like stocks, bonds, mutual funds, or GICs held outside of registered accounts.">
              </SmartTooltip>
            </label>
            <input
              type="text"
              value={formatCurrency(data.nonRegisteredSavings, true)}
              onChange={(e) => handleCurrencyChange(e.target.value, 'nonRegisteredSavings')}
              className="form-input input-currency"
              placeholder="$15,000"
            />
          </div>

          {/* Other Savings */}
          <div className="input-container">
            <label className="input-label">
              Other Savings
              <SmartTooltip content="Emergency funds, high-interest savings accounts, or other liquid savings not already included above.">
              </SmartTooltip>
            </label>
            <input
              type="text"
              value={formatCurrency(data.otherSavings, true)}
              onChange={(e) => handleCurrencyChange(e.target.value, 'otherSavings')}
              className="form-input input-currency"
              placeholder="$10,000"
            />
          </div>
        </div>

        {/* Company Pension */}
        <CompanyPensionSelector
          value={data.companyPension > 0 ? true : data.companyPension === 0 ? false : null}
          onChange={(hasPension) => updateData({ companyPension: hasPension ? 15000 : 0 })}
        />

        {/* Monthly Contributions */}
        <div className="input-container">
          <label className="input-label">
            Monthly Retirement Contributions
            <SmartTooltip content="How much you currently contribute monthly to retirement savings (RRSP, TFSA, employer matching, etc.)">
            </SmartTooltip>
          </label>
          <input
            type="text"
            value={formatCurrency(data.monthlyContributions, true)}
            onChange={(e) => handleCurrencyChange(e.target.value, 'monthlyContributions')}
            className="form-input input-currency"
            placeholder="$500"
          />
        </div>

        {/* Expected Return Rate */}
        <ReturnRateSelector
          value={data.expectedReturn}
          onChange={(rate) => updateData({ expectedReturn: rate })}
        />

        {/* Total Summary Card */}
        <div className="card-surface p-6 rounded-xl">
          <h3 className="text-h3 font-semibold text-brand-primary mb-4">
            Your Current Position
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-accent">
                {formatCurrency(totalSavings)}
              </div>
              <div className="text-small text-text-muted">Total Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-primary">
                {formatCurrency(data.monthlyContributions * 12)}
              </div>
              <div className="text-small text-text-muted">Annual Contributions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {(data.expectedReturn * 100).toFixed(1)}%
              </div>
              <div className="text-small text-text-muted">Expected Return</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-accent">
                {data.retirementAge - data.currentAge}
              </div>
              <div className="text-small text-text-muted">Years to Retire</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSavings;
