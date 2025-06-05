
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RetirementData } from "./types";
import ExplanationCard from "./ExplanationCard";

interface IncomeGoalsProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const IncomeGoals = ({ data, updateData }: IncomeGoalsProps) => {
  const totalExpectedIncome = data.cppBenefits + data.oasBenefits + data.companyPension + data.additionalIncome;
  const incomeGap = Math.max(0, data.desiredIncome - totalExpectedIncome);

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
        <h2 className="text-h1 text-brand-secondary">Income & Goals</h2>
        <p className="text-body text-text-secondary">
          Let's determine how much income you'll need and what sources you can expect in retirement.
        </p>
      </div>

      {/* Income Gap Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-surface text-center">
          <div className="text-h2 text-brand-primary font-semibold">
            {formatCurrency(data.desiredIncome)}
          </div>
          <div className="text-caption text-text-secondary">
            desired annual income
          </div>
        </div>
        <div className="card-surface text-center">
          <div className="text-h2 text-text-secondary font-semibold">
            {formatCurrency(totalExpectedIncome)}
          </div>
          <div className="text-caption text-text-secondary">
            expected from benefits
          </div>
        </div>
        <div className="card-surface text-center">
          <div className="text-h2 text-brand-secondary font-semibold">
            {formatCurrency(incomeGap)}
          </div>
          <div className="text-caption text-text-secondary">
            needed from savings
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Desired Income */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="desiredIncome" className="text-h3 text-brand-secondary">
              Desired Annual Income
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="desiredIncome"
                type="number"
                value={data.desiredIncome || ""}
                onChange={(e) => updateData({ desiredIncome: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="60000"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Annual income needed in retirement (today's dollars)
            </p>
          </div>
          
          <ExplanationCard
            title="Setting Your Income Goal"
            explanation="This is how much annual income you'd like to have during retirement, expressed in today's dollars. The calculator will adjust for inflation."
            thingsToConsider="Most financial planners suggest aiming for 70-80% of your pre-retirement income to maintain a similar lifestyle. However, your specific needs may vary based on planned activities, health considerations, and whether your mortgage will be paid off."
          />
        </div>

        {/* CPP Benefits */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cppBenefits" className="text-h3 text-brand-secondary">
              Expected CPP/QPP Benefits
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="cppBenefits"
                type="number"
                value={data.cppBenefits || ""}
                onChange={(e) => updateData({ cppBenefits: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="12000"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Annual Canada/Quebec Pension Plan benefits
            </p>
          </div>
          
          <ExplanationCard
            title="CPP/QPP Benefits"
            explanation="The Canada Pension Plan (or Quebec Pension Plan) provides a monthly retirement benefit based on your contributions throughout your working years."
            thingsToConsider="The maximum monthly CPP payment in 2025 is $1,433.00 at age 65, but the average is about $900. Taking CPP early (from age 60) reduces your benefit by 0.6% per month (up to 36%), while delaying until 70 increases it by 0.7% per month (up to 42%)."
          />
        </div>

        {/* OAS Benefits */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oasBenefits" className="text-h3 text-brand-secondary">
              Expected OAS Benefits
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="oasBenefits"
                type="number"
                value={data.oasBenefits || ""}
                onChange={(e) => updateData({ oasBenefits: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="8700"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Annual Old Age Security benefits
            </p>
          </div>
          
          <ExplanationCard
            title="OAS Benefits"
            explanation="Old Age Security is a government pension available to most Canadians aged 65 and older, regardless of work history. It's based on how long you've lived in Canada after age 18."
            thingsToConsider="The maximum monthly OAS payment in 2025 is $727.67 (ages 65-74) and $800.44 (ages 75+). OAS is subject to a 'clawback' if your individual net income exceeds $90,997 (2025) and is fully clawed back at around $133,141."
          />
        </div>

        {/* Company Pension */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyPension" className="text-h3 text-brand-secondary">
              Company Pension
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="companyPension"
                type="number"
                value={data.companyPension || ""}
                onChange={(e) => updateData({ companyPension: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Annual employer pension benefits
            </p>
          </div>
          
          <ExplanationCard
            title="Employer Pension Plans"
            explanation="A company pension is a retirement plan offered by employers that provides regular income during retirement, either based on your salary and years of service (defined benefit) or investment performance (defined contribution)."
            thingsToConsider="Only about 37% of Canadian workers have employer pension coverage, with higher rates in the public sector. If you have a defined benefit pension, it significantly reduces the amount you need to save personally."
          />
        </div>

        {/* Additional Income */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="additionalIncome" className="text-h3 text-brand-secondary">
              Additional Income Sources
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <Input
                id="additionalIncome"
                type="number"
                value={data.additionalIncome || ""}
                onChange={(e) => updateData({ additionalIncome: parseFloat(e.target.value) || 0 })}
                className="input-currency pl-8"
                placeholder="0"
              />
            </div>
            <p className="text-caption text-text-secondary">
              Rental income, part-time work, etc.
            </p>
          </div>
          
          <ExplanationCard
            title="Other Income Sources"
            explanation="These are other reliable sources of income you expect during retirement, such as rental properties, part-time work, or other investments."
            thingsToConsider="Many Canadians supplement their retirement with part-time work, especially in the early retirement years. Rental income can provide inflation-protected cash flow, but remember to account for property management, maintenance, and potential vacancy periods."
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeGoals;
