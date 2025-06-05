import React from "react";
import { RetirementData } from "./types";
import ModernInput from "./ModernInput";
import MetricCard from "./MetricCard";

interface CurrentSavingsProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const totalSavings = data.rrspBalance + data.tfsaBalance + data.otherSavings + data.nonRegisteredSavings;

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-h1 text-text-primary">Current Savings</h2>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Tell us about your existing retirement savings. Don't worry if you're just starting out – everyone begins somewhere.
        </p>
      </div>

      {/* Total Savings Highlight */}
      <div className="flex justify-center">
        <MetricCard
          value={totalSavings}
          label="total retirement savings"
          format="currency"
          size="large"
          trend="positive"
          className="text-center border-2 border-success/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RRSP Balance */}
        <ModernInput
          label="RRSP Balance"
          value={data.rrspBalance}
          onChange={(value) => updateData({ rrspBalance: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="Tax-deferred retirement account with contribution limits"
          helpTitle="RRSP Benefits"
          helpItems={[
            "Contributions are tax-deductible",
            "Investments grow tax-free until withdrawal",
            "2025 contribution limit: 18% of income up to $31,560"
          ]}
          quickTip="RRSP contributions reduce your current year's taxes while building retirement wealth."
        />

        {/* TFSA Balance */}
        <ModernInput
          label="TFSA Balance"
          value={data.tfsaBalance}
          onChange={(value) => updateData({ tfsaBalance: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="Tax-free investment account with flexible withdrawals"
          helpTitle="TFSA Advantages"
          helpItems={[
            "Investment growth is completely tax-free",
            "Withdrawals don't affect government benefits",
            "2025 contribution room: $7,000 annually"
          ]}
          quickTip="TFSAs are perfect for retirement - no taxes on withdrawals!"
        />

        {/* Other Registered Savings */}
        <ModernInput
          label="Other Registered Savings"
          value={data.otherSavings}
          onChange={(value) => updateData({ otherSavings: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="LIRAs, RPPs, DPSPs, and other registered accounts"
          helpTitle="Other Registered Accounts"
          helpItems={[
            "Locked-In Retirement Accounts (LIRAs)",
            "Registered Pension Plans (RPPs)",
            "Deferred Profit Sharing Plans (DPSPs)"
          ]}
          quickTip="These accounts typically have withdrawal restrictions but offer tax advantages."
        />

        {/* Non-Registered Savings */}
        <ModernInput
          label="Non-Registered Savings"
          value={data.nonRegisteredSavings}
          onChange={(value) => updateData({ nonRegisteredSavings: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="Regular investment accounts and savings"
          helpTitle="Non-Registered Investments"
          helpItems={[
            "Complete flexibility for withdrawals",
            "Capital gains are 50% taxable",
            "Canadian dividends receive tax credits"
          ]}
          quickTip="Great for bridging early retirement before accessing registered accounts."
        />

        {/* Monthly Contributions */}
        <ModernInput
          label="Monthly Contributions"
          value={data.monthlyContributions}
          onChange={(value) => updateData({ monthlyContributions: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="How much you're saving each month across all accounts"
          helpTitle="The Power of Consistent Saving"
          helpItems={[
            "Experts recommend saving 10-15% of income",
            "Automatic contributions make saving effortless",
            "Small increases compound significantly over time"
          ]}
          quickTip="Increasing your monthly contributions by just $100 can add thousands to your retirement."
        />

        {/* Expected Return */}
        <div className="space-y-4">
          <ModernInput
            label="Expected Annual Return"
            value={(data.expectedReturn * 100).toFixed(1)}
            onChange={(value) => updateData({ expectedReturn: parseFloat(value) / 100 || 0 })}
            type="number"
            placeholder="6.0"
            tooltip="Expected investment growth rate before fees and inflation"
            helpTitle="Historical Canadian Returns"
            helpItems={[
              "Conservative (30% stocks): 4-5% annually",
              "Balanced (60% stocks): 5-6% annually", 
              "Growth (80% stocks): 6-7% annually"
            ]}
            quickTip="A diversified portfolio of Canadian and global stocks has historically returned 6-7% annually."
          />
          <div className="text-right">
            <span className="text-h3 font-semibold text-primary-brand">%</span>
          </div>
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="bg-gradient-to-r from-secondary to-surface rounded-xl p-6 border border-border">
        <h3 className="text-h3 text-text-primary mb-6">Your Retirement Portfolio</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-h2 font-bold text-primary-brand">
              ${data.rrspBalance.toLocaleString()}
            </div>
            <div className="text-caption text-text-secondary">RRSP</div>
            <div className="text-small text-text-muted">
              {totalSavings > 0 ? Math.round((data.rrspBalance / totalSavings) * 100) : 0}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-accent">
              ${data.tfsaBalance.toLocaleString()}
            </div>
            <div className="text-caption text-text-secondary">TFSA</div>
            <div className="text-small text-text-muted">
              {totalSavings > 0 ? Math.round((data.tfsaBalance / totalSavings) * 100) : 0}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-success">
              ${data.otherSavings.toLocaleString()}
            </div>
            <div className="text-caption text-text-secondary">Other</div>
            <div className="text-small text-text-muted">
              {totalSavings > 0 ? Math.round((data.otherSavings / totalSavings) * 100) : 0}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-warning">
              ${data.nonRegisteredSavings.toLocaleString()}
            </div>
            <div className="text-caption text-text-secondary">Non-Reg</div>
            <div className="text-small text-text-muted">
              {totalSavings > 0 ? Math.round((data.nonRegisteredSavings / totalSavings) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSavings;
