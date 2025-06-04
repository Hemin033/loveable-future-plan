
import { CalculatorData } from "./types";
import ExplanationCard from "./ExplanationCard";

interface CurrentSavingsProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const totalSavings = data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium text-gray-900 mb-2">Current Savings</h2>
        <p className="text-gray-600">Tell us about your existing retirement savings and contributions</p>
      </div>

      <div className="space-y-6">
        {/* RRSP Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RRSP Balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={data.rrspBalance}
              onChange={(e) => updateData({ rrspBalance: parseInt(e.target.value) || 0 })}
              className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              placeholder="25,000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Registered Retirement Savings Plan</p>
          <ExplanationCard
            title="RRSP Balance"
            explanation="A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account specifically designed for retirement savings. Contributions are tax-deductible, and investments grow tax-free until withdrawal."
            thingsToConsider="The average Canadian approaching retirement (age 55+) has approximately $125,000 in RRSP savings. Financial experts often recommend having 1x your annual salary saved by age 30, 3x by 40, 6x by 50, and 8x by 60."
          />
        </div>

        {/* TFSA Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TFSA Balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={data.tfsaBalance}
              onChange={(e) => updateData({ tfsaBalance: parseInt(e.target.value) || 0 })}
              className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              placeholder="15,000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Tax-Free Savings Account</p>
          <ExplanationCard
            title="TFSA Balance"
            explanation="A Tax-Free Savings Account (TFSA) allows your investments to grow tax-free, and you pay no taxes when you withdraw the money, making it an excellent complement to RRSPs for retirement."
            thingsToConsider="TFSAs are particularly valuable in retirement for flexibility and tax-free withdrawals. Unlike RRSPs, TFSA withdrawals don't affect income-tested benefits like OAS. The 2025 annual contribution limit is $7,000, with a cumulative limit of $95,000 for someone who was 18+ in 2009."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Pension */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Pension Value
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={data.pensionValue}
                onChange={(e) => updateData({ pensionValue: parseInt(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                placeholder="0"
              />
            </div>
            <ExplanationCard
              title="Company Pension"
              explanation="A company pension is a retirement plan offered by employers that provides regular income during retirement, either based on your salary and years of service (defined benefit) or investment performance (defined contribution)."
              thingsToConsider="Only about 37% of Canadian workers have employer pension coverage, with higher rates in the public sector. If you have a defined benefit pension, it significantly reduces the amount you need to save personally."
            />
          </div>

          {/* Other Savings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Retirement Savings
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={data.otherSavings}
                onChange={(e) => updateData({ otherSavings: parseInt(e.target.value) || 0 })}
                className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                placeholder="0"
              />
            </div>
            <ExplanationCard
              title="Non-Registered Savings"
              explanation="These are regular savings or investment accounts without special tax advantages. While they don't offer tax deductions or tax-free growth, they provide flexibility with no withdrawal restrictions."
              thingsToConsider="Non-registered accounts can be tax-efficient for certain investments like Canadian dividend stocks (eligible for the dividend tax credit) and investments that generate capital gains (only 50% taxable)."
            />
          </div>
        </div>

        {/* Monthly Contributions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Retirement Contributions
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={data.monthlyContributions}
              onChange={(e) => updateData({ monthlyContributions: parseInt(e.target.value) || 0 })}
              className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              placeholder="500"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Combined monthly contributions to all retirement accounts</p>
          <ExplanationCard
            title="Monthly Contributions"
            explanation="This is how much you're regularly adding to your retirement savings each month across all your accounts."
            thingsToConsider="Financial experts often recommend saving 10-15% of your pre-tax income for retirement. Even small increases in your monthly contributions can have a significant impact over time thanks to compound growth. A balanced approach using both RRSPs and TFSAs is often optimal."
          />
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded">
          <h3 className="font-medium text-gray-900 mb-4">Your Current Portfolio</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">RRSP</div>
              <div className="font-medium text-gray-900">{formatCurrency(data.rrspBalance)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">TFSA</div>
              <div className="font-medium text-gray-900">{formatCurrency(data.tfsaBalance)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Pension</div>
              <div className="font-medium text-gray-900">{formatCurrency(data.pensionValue)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Other</div>
              <div className="font-medium text-gray-900">{formatCurrency(data.otherSavings)}</div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Current Savings:</span>
              <span className="font-medium text-lg text-gray-900">{formatCurrency(totalSavings)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Monthly Contributions:</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.monthlyContributions)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSavings;
