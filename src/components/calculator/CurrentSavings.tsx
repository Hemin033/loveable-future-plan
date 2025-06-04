
import { motion } from "framer-motion";
import { CalculatorData } from "./types";
import { RetirementTimelineChart } from "./ChartComponents";

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
  helperText,
  color = "blue",
  icon
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  helperText?: string;
  color?: string;
  icon?: string;
}) => {
  const colorClasses = {
    blue: "focus:ring-blue-500/20 focus:border-blue-500",
    green: "focus:ring-green-500/20 focus:border-green-500",
    purple: "focus:ring-purple-500/20 focus:border-purple-500",
    orange: "focus:ring-orange-500/20 focus:border-orange-500"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <label className="flex items-center text-sm font-medium text-gray-700">
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-semibold z-10">
          $
        </span>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-6 border border-gray-200/50 rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} transition-all text-xl font-semibold bg-white/70 backdrop-blur-sm hover:bg-white/80 group-hover:shadow-lg`}
        />
      </div>
      {helperText && (
        <p className="text-sm text-gray-500 leading-relaxed">{helperText}</p>
      )}
    </motion.div>
  );
};

const CurrentSavings = ({ data, updateData }: CurrentSavingsProps) => {
  const totalSavings = data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-light text-gray-900 mb-2">Current Savings</h2>
        <p className="text-gray-600 text-lg">Tell us about your existing retirement savings and contributions</p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* RRSP & TFSA - Two Medium Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-6 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <CurrencyInput
            label="RRSP Balance"
            value={data.rrspBalance}
            onChange={(value) => updateData({ rrspBalance: value })}
            placeholder="Enter your RRSP balance"
            helperText="Registered Retirement Savings Plan - tax-deferred growth with tax deductions on contributions"
            color="green"
            icon="🏦"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-6 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <CurrencyInput
            label="TFSA Balance"
            value={data.tfsaBalance}
            onChange={(value) => updateData({ tfsaBalance: value })}
            placeholder="Enter your TFSA balance"
            helperText="Tax-Free Savings Account - tax-free growth and withdrawals, flexible access to funds"
            color="blue"
            icon="💎"
          />
        </motion.div>

        {/* Pension, Other Savings, Monthly Contributions - Three Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-4 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <CurrencyInput
            label="Company Pension Value"
            value={data.pensionValue}
            onChange={(value) => updateData({ pensionValue: value })}
            placeholder="0"
            helperText="Current value of employer pension plan (DB or DC)"
            color="purple"
            icon="🏢"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-4 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <CurrencyInput
            label="Other Retirement Savings"
            value={data.otherSavings}
            onChange={(value) => updateData({ otherSavings: value })}
            placeholder="0"
            helperText="Non-registered investments, other retirement accounts"
            color="orange"
            icon="📊"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="col-span-12 lg:col-span-4 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <CurrencyInput
            label="Monthly Retirement Contributions"
            value={data.monthlyContributions}
            onChange={(value) => updateData({ monthlyContributions: value })}
            placeholder="500"
            helperText="Combined monthly contributions to all retirement accounts"
            color="green"
            icon="💰"
          />
        </motion.div>

        {/* Savings Timeline Visualization - Large Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="col-span-12 lg:col-span-8"
        >
          <RetirementTimelineChart data={data} />
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="col-span-12 lg:col-span-4 bg-gradient-to-br from-green-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 border border-green-200/50 shadow-xl"
        >
          <h3 className="font-semibold text-gray-900 mb-6 text-xl">💼 Your Current Portfolio</h3>
          
          <div className="space-y-4">
            {[
              { label: "RRSP", value: data.rrspBalance, color: "bg-green-500", percentage: (data.rrspBalance / Math.max(totalSavings, 1)) * 100 },
              { label: "TFSA", value: data.tfsaBalance, color: "bg-blue-500", percentage: (data.tfsaBalance / Math.max(totalSavings, 1)) * 100 },
              { label: "Pension", value: data.pensionValue, color: "bg-purple-500", percentage: (data.pensionValue / Math.max(totalSavings, 1)) * 100 },
              { label: "Other", value: data.otherSavings, color: "bg-orange-500", percentage: (data.otherSavings / Math.max(totalSavings, 1)) * 100 }
            ].map((account, index) => (
              <div key={account.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{account.label}</span>
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(account.value)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${account.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`h-2 rounded-full ${account.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Savings:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {formatCurrency(totalSavings)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Monthly Contributions:</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(data.monthlyContributions)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CurrentSavings;
