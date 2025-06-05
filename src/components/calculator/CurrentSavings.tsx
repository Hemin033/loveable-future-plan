import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RetirementData } from "./types";
import ExplanationCard from "./ExplanationCard";

interface CurrentSavingsProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const totalSavings = data.rrspBalance + data.tfsaBalance + data.otherSavings + data.nonRegisteredSavings;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h1 text-brand-secondary">Current Savings</h2>
        <p className="text-body text-text-secondary">
          Tell us about your existing retirement savings and investment accounts.
        </p>
      </div>

      {/* Total Savings Highlight */}
      <div className="card-surface text-center">
        <div className="text-display text-brand-primary font-bold">
          {formatCurrency(totalSavings)}
        </div>
        <div className="text-body text-text-secondary">
          total retirement savings
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RRSP Balance */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rrspBalance" className="text-h3 text-brand-secondary">
              RRSP Balance
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="rrspBalance"
                type="number"
                value={data.rrspBalance || ""}
                onChange={(e) => updateData({ rrspBalance: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Tax-deferred retirement savings
            </p>
          </div>
          
          <ExplanationCard
            title="RRSP (Registered Retirement Savings Plan)"
            explanation="A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account specifically designed for retirement savings. Contributions are tax-deductible, and investments grow tax-free until withdrawal."
            thingsToConsider="The average Canadian approaching retirement (age 55+) has approximately $125,000 in RRSP savings. Financial experts often recommend having 1x your annual salary saved by age 30, 3x by 40, 6x by 50, and 8x by 60."
          />
        </div>

        {/* TFSA Balance */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tfsaBalance" className="text-h3 text-brand-secondary">
              TFSA Balance
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="tfsaBalance"
                type="number"
                value={data.tfsaBalance || ""}
                onChange={(e) => updateData({ tfsaBalance: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Tax-free investment account
            </p>
          </div>
          
          <ExplanationCard
            title="TFSA (Tax-Free Savings Account)"
            explanation="A Tax-Free Savings Account (TFSA) allows your investments to grow tax-free, and you pay no taxes when you withdraw the money, making it an excellent complement to RRSPs for retirement."
            thingsToConsider="TFSAs are particularly valuable in retirement for flexibility and tax-free withdrawals. Unlike RRSPs, TFSA withdrawals don't affect income-tested benefits like OAS. The 2025 annual contribution limit is $7,000, with a cumulative limit of $95,000 for someone who was 18+ in 2009."
          />
        </div>

        {/* Other Registered Savings */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otherSavings" className="text-h3 text-brand-secondary">
              Other Registered Savings
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="otherSavings"
                type="number"
                value={data.otherSavings || ""}
                onChange={(e) => updateData({ otherSavings: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              LIRAs, RPPs, DPSPs, etc.
            </p>
          </div>
          
          <ExplanationCard
            title="Other Registered Accounts"
            explanation="This includes other tax-advantaged accounts like Locked-In Retirement Accounts (LIRAs), Registered Pension Plans (RPPs), or Deferred Profit Sharing Plans (DPSPs)."
            thingsToConsider="Locked-in accounts have withdrawal restrictions and may require conversion to income funds (LIFs) at retirement with maximum and minimum withdrawal limits."
          />
        </div>

        {/* Non-Registered Savings */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nonRegisteredSavings" className="text-h3 text-brand-secondary">
              Non-Registered Savings
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="nonRegisteredSavings"
                type="number"
                value={data.nonRegisteredSavings || ""}
                onChange={(e) => updateData({ nonRegisteredSavings: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Regular investment accounts
            </p>
          </div>
          
          <ExplanationCard
            title="Non-Registered Investments"
            explanation="These are regular savings or investment accounts without special tax advantages. While they don't offer tax deductions or tax-free growth, they provide flexibility with no withdrawal restrictions."
            thingsToConsider="Non-registered accounts can be tax-efficient for certain investments like Canadian dividend stocks (eligible for the dividend tax credit) and investments that generate capital gains (only 50% taxable)."
          />
        </div>

        {/* Monthly Contributions */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyContributions" className="text-h3 text-brand-secondary">
              Monthly Contributions
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="monthlyContributions"
                type="number"
                value={data.monthlyContributions || ""}
                onChange={(e) => updateData({ monthlyContributions: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              How much you save each month
            </p>
          </div>
          
          <ExplanationCard
            title="Regular Contributions"
            explanation="This is how much you're regularly adding to your retirement savings each month across all your accounts."
            thingsToConsider="Financial experts often recommend saving 10-15% of your pre-tax income for retirement. Even small increases in your monthly contributions can have a significant impact over time thanks to compound growth."
          />
        </div>

        {/* Expected Return */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="expectedReturn" className="text-h3 text-brand-secondary">
              Expected Annual Return
            </Label>
            <div className="relative">
              <Input
                id="expectedReturn"
                type="number"
                step="0.01"
                value={(data.expectedReturn * 100).toFixed(1)}
                onChange={(e) => updateData({ expectedReturn: parseFloat(e.target.value) / 100 || 0 })}
                className="input-field pr-8"
                placeholder="6.0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">%</span>
            </div>
            <p className="text-caption text-text-secondary">
              Expected investment growth rate
            </p>
          </div>
          
          <ExplanationCard
            title="Investment Returns"
            explanation="This is how much you expect your investments to grow each year, on average, before retirement. Different types of investments have different potential returns and risks."
            thingsToConsider="Historically, diversified portfolios in Canada have returned approximately: Conservative (30% stocks/70% bonds): 4-5% annually; Balanced (60% stocks/40% bonds): 5-6% annually; Growth (80% stocks/20% bonds): 6-7% annually. These are before inflation and fees."
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentSavings;
