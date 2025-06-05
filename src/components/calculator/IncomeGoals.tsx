
import React from "react";
import { RetirementData } from "./types";
import ModernInput from "./ModernInput";
import MetricCard from "./MetricCard";

interface IncomeGoalsProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const IncomeGoals = ({ data, updateData }: IncomeGoalsProps) => {
  const totalExpectedIncome = data.cppBenefits + data.oasBenefits + data.companyPension + data.additionalIncome;
  const incomeGap = Math.max(0, data.desiredIncome - totalExpectedIncome);
  const monthlyGap = incomeGap / 12;

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-h1 text-text-primary">Income & Goals</h2>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Let's determine your retirement income needs and explore all your potential income sources.
        </p>
      </div>

      {/* Income Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          value={data.desiredIncome}
          label="desired annual income"
          format="currency"
          trend="neutral"
        />
        <MetricCard
          value={totalExpectedIncome}
          label="from government & benefits"
          format="currency"
          trend="positive"
        />
        <MetricCard
          value={incomeGap}
          label="needed from savings"
          format="currency"
          trend={incomeGap > 0 ? "negative" : "positive"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Desired Income */}
        <ModernInput
          label="Desired Annual Income"
          value={data.desiredIncome}
          onChange={(value) => updateData({ desiredIncome: parseFloat(value) || 0 })}
          type="currency"
          placeholder="60000"
          tooltip="Annual income needed in retirement (today's dollars)"
          helpTitle="Setting Your Income Goal"
          helpItems={[
            "Most Canadians need 70-80% of pre-retirement income",
            "Consider your mortgage will likely be paid off",
            "Factor in healthcare costs and lifestyle goals"
          ]}
          quickTip="Start with 75% of your current income and adjust based on your retirement lifestyle plans."
        />

        {/* CPP Benefits */}
        <ModernInput
          label="Expected CPP/QPP Benefits"
          value={data.cppBenefits}
          onChange={(value) => updateData({ cppBenefits: parseFloat(value) || 0 })}
          type="currency"
          placeholder="12000"
          tooltip="Annual Canada/Quebec Pension Plan benefits"
          helpTitle="CPP/QPP Benefits"
          helpItems={[
            "Maximum monthly CPP: $1,433 at age 65 (2025)",
            "Average monthly CPP: ~$900",
            "Taking CPP early reduces benefits by 0.6% per month"
          ]}
          quickTip="You can check your actual CPP estimate on the Government of Canada website."
        />

        {/* OAS Benefits */}
        <ModernInput
          label="Expected OAS Benefits"
          value={data.oasBenefits}
          onChange={(value) => updateData({ oasBenefits: parseFloat(value) || 0 })}
          type="currency"
          placeholder="8700"
          tooltip="Annual Old Age Security benefits"
          helpTitle="OAS Benefits"
          helpItems={[
            "Maximum monthly OAS: $727.67 (ages 65-74)",
            "Enhanced OAS: $800.44 (ages 75+)",
            "Subject to clawback if income exceeds $90,997"
          ]}
          quickTip="OAS is available to most Canadians aged 65+ who have lived in Canada for 10+ years."
        />

        {/* Company Pension */}
        <ModernInput
          label="Company Pension"
          value={data.companyPension}
          onChange={(value) => updateData({ companyPension: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="Annual employer pension benefits"
          helpTitle="Employer Pension Plans"
          helpItems={[
            "Only 37% of Canadian workers have pension coverage",
            "Public sector workers have higher coverage rates",
            "Defined benefit pensions provide guaranteed income"
          ]}
          quickTip="If you have a defined benefit pension, it significantly reduces how much you need to save personally."
        />

        {/* Additional Income */}
        <ModernInput
          label="Additional Income Sources"
          value={data.additionalIncome}
          onChange={(value) => updateData({ additionalIncome: parseFloat(value) || 0 })}
          type="currency"
          placeholder="0"
          tooltip="Rental income, part-time work, other reliable income"
          helpTitle="Other Income Sources"
          helpItems={[
            "Rental properties provide inflation-protected income",
            "Many retirees work part-time in early retirement",
            "Consider business income or investment dividends"
          ]}
          quickTip="Diversifying your retirement income sources reduces risk and provides more security."
        />
      </div>

      {/* Income Analysis */}
      <div className="bg-gradient-to-r from-primary-brand/5 to-accent/5 rounded-xl p-6 border border-primary-brand/10">
        <h3 className="text-h3 text-text-primary mb-4">Retirement Income Analysis</h3>
        
        {incomeGap > 0 ? (
          <div className="space-y-4">
            <p className="text-body text-text-secondary">
              You'll need an additional <span className="font-semibold text-error">${monthlyGap.toLocaleString()}/month</span> ({" "}
              <span className="font-semibold text-error">${incomeGap.toLocaleString()}/year</span>) from your personal savings to reach your retirement income goal.
            </p>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <p className="text-caption text-warning font-medium">
                💡 This gap shows how much monthly income your retirement savings need to generate.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-body text-success font-medium">
              🎉 Great news! Your expected benefits and income sources cover your desired retirement income.
            </p>
            <p className="text-caption text-text-secondary">
              You may want to save additional funds for unexpected expenses, healthcare costs, or to leave a legacy.
            </p>
          </div>
        )}

        {/* Income Breakdown Chart */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-h3 font-bold text-primary-brand">
              ${Math.round(data.cppBenefits / 12).toLocaleString()}
            </div>
            <div className="text-small text-text-secondary">CPP/QPP Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-h3 font-bold text-accent">
              ${Math.round(data.oasBenefits / 12).toLocaleString()}
            </div>
            <div className="text-small text-text-secondary">OAS Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-h3 font-bold text-success">
              ${Math.round((data.companyPension + data.additionalIncome) / 12).toLocaleString()}
            </div>
            <div className="text-small text-text-secondary">Other Monthly</div>
          </div>
          <div className="text-center">
            <div className={`text-h3 font-bold ${incomeGap > 0 ? 'text-error' : 'text-success'}`}>
              ${Math.round(monthlyGap).toLocaleString()}
            </div>
            <div className="text-small text-text-secondary">Gap Monthly</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeGoals;
