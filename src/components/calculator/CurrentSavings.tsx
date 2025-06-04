
import { motion } from "framer-motion";
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

const CurrencyInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  helperText 
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  helperText?: string;
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
          $
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          placeholder={placeholder}
          className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
        />
      </div>
      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const totalSavings = data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-light text-gray-900 mb-2">Current Savings</h2>
        <p className="text-gray-600">Tell us about your existing retirement savings and contributions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CurrencyInput
          label="RRSP Balance"
          value={data.rrspBalance}
          onChange={(value) => updateData({ rrspBalance: value })}
          placeholder="Enter your RRSP balance"
          helperText="Registered Retirement Savings Plan current value"
        />

        <CurrencyInput
          label="TFSA Balance"
          value={data.tfsaBalance}
          onChange={(value) => updateData({ tfsaBalance: value })}
          placeholder="Enter your TFSA balance"
          helperText="Tax-Free Savings Account current value"
        />

        <CurrencyInput
          label="Company Pension Value"
          value={data.pensionValue}
          onChange={(value) => updateData({ pensionValue: value })}
          placeholder="0"
          helperText="Current value of employer pension plan"
        />

        <CurrencyInput
          label="Other Retirement Savings"
          value={data.otherSavings}
          onChange={(value) => updateData({ otherSavings: value })}
          placeholder="0"
          helperText="Non-registered investments, other retirement accounts"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <CurrencyInput
          label="Monthly Retirement Contributions"
          value={data.monthlyContributions}
          onChange={(value) => updateData({ monthlyContributions: value })}
          placeholder="500"
          helperText="Combined monthly contributions to all retirement accounts"
        />
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Your Current Retirement Savings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(data.rrspBalance)}</div>
            <div className="text-sm text-gray-600">RRSP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.tfsaBalance)}</div>
            <div className="text-sm text-gray-600">TFSA</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(data.pensionValue)}</div>
            <div className="text-sm text-gray-600">Pension</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">{formatCurrency(data.otherSavings)}</div>
            <div className="text-sm text-gray-600">Other</div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total Current Savings:</span>
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalSavings)}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Monthly Contributions:</span>
            <span className="text-lg font-medium text-gray-900">{formatCurrency(data.monthlyContributions)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CurrentSavings;
