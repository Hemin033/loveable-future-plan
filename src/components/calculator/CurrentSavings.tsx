import { CalculatorData } from "./types";

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
