
import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { CalculatorData } from "./types";
import InfoModal from "./InfoModal";

interface IncomeGoalsProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

const IncomeGoals = ({ data, updateData }: IncomeGoalsProps) => {
  const [showCPPModal, setShowCPPModal] = useState(false);
  const [showOASModal, setShowOASModal] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const incomeGrowthOptions = [
    { value: 2, label: "2% - Conservative" },
    { value: 2.5, label: "2.5% - Moderate" },
    { value: 3, label: "3% - Above Average" },
    { value: 3.5, label: "3.5% - Optimistic" }
  ];

  const retirementIncomeOptions = [
    { value: 60, label: "60% - Basic lifestyle" },
    { value: 70, label: "70% - Comfortable lifestyle" },
    { value: 80, label: "80% - Current lifestyle" },
    { value: 90, label: "90% - Enhanced lifestyle" }
  ];

  const riskToleranceOptions = [
    { value: "conservative", label: "Conservative (4-5% return)" },
    { value: "moderate", label: "Moderate (6-7% return)" },
    { value: "aggressive", label: "Aggressive (8-9% return)" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-light text-gray-900 mb-2">Income & Goals</h2>
        <p className="text-gray-600">Define your income and retirement lifestyle goals</p>
      </div>

      <div className="space-y-6">
        {/* Annual Income */}
        <div className="bg-gray-50 rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Annual Gross Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
              $
            </span>
            <input
              type="number"
              value={data.annualIncome}
              onChange={(e) => updateData({ annualIncome: parseInt(e.target.value) || 0 })}
              className="w-full pl-8 pr-4 py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-2xl font-semibold text-center"
              placeholder="75,000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Total annual income before taxes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Growth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expected Annual Income Growth
            </label>
            <select
              value={data.incomeGrowth}
              onChange={(e) => updateData({ incomeGrowth: parseFloat(e.target.value) })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {incomeGrowthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Retirement Income Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Desired Retirement Income (% of final salary)
            </label>
            <select
              value={data.retirementIncomePercent}
              onChange={(e) => updateData({ retirementIncomePercent: parseInt(e.target.value) })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {retirementIncomeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* CPP/QPP */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Expected Monthly CPP/QPP
              <button
                onClick={() => setShowCPPModal(true)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <Info size={16} />
              </button>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={data.expectedCPP}
                onChange={(e) => updateData({ expectedCPP: parseInt(e.target.value) || 0 })}
                className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* OAS */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Expected Monthly OAS
              <button
                onClick={() => setShowOASModal(true)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <Info size={16} />
              </button>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={data.expectedOAS}
                onChange={(e) => updateData({ expectedOAS: parseInt(e.target.value) || 0 })}
                className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Risk Tolerance */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Investment Risk Tolerance
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskToleranceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateData({ riskTolerance: option.value as any })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  data.riskTolerance === option.value
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">{option.label.split(' (')[0]}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {option.label.split(' (')[1]?.replace(')', '')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Retirement Income Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(data.annualIncome * Math.pow(1 + data.incomeGrowth / 100, data.retirementAge - data.currentAge))}
              </div>
              <div className="text-sm text-gray-600">Final Salary</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {formatCurrency(data.annualIncome * Math.pow(1 + data.incomeGrowth / 100, data.retirementAge - data.currentAge) * data.retirementIncomePercent / 100)}
              </div>
              <div className="text-sm text-gray-600">Target Retirement Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency((data.expectedCPP + data.expectedOAS) * 12)}
              </div>
              <div className="text-sm text-gray-600">Government Benefits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InfoModal 
        isOpen={showCPPModal}
        onClose={() => setShowCPPModal(false)}
        title="CPP/QPP Information"
        content={
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <strong>2024 Average:</strong> $808/month ($9,698/year)<br />
              <strong>Maximum 2025:</strong> Up to $1,364/month at age 65
            </div>
            <div>
              <h4 className="font-semibold mb-2">How CPP/QPP is Calculated:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Based on your highest-earning 39 years</li>
                <li>5.95% contribution rate on earnings $3,500-$71,300</li>
                <li>Enhanced CPP: Additional 4% on $71,300-$81,200</li>
                <li>Employer contributes matching amount</li>
                <li>QPP in Quebec has slightly higher rates (6.4%)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Starting Age Impact:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Age 60: 36% reduction (0.6% per month early)</li>
                <li>Age 65: Full amount</li>
                <li>Age 70: 42% increase (0.7% per month delayed)</li>
              </ul>
            </div>
          </div>
        }
      />

      <InfoModal 
        isOpen={showOASModal}
        onClose={() => setShowOASModal(false)}
        title="OAS Information"
        content={
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <strong>2025 Maximum:</strong><br />
              Ages 65-74: $728/month ($8,732/year)<br />
              Ages 75+: $800/month ($9,600/year) - 10% boost
            </div>
            <div>
              <h4 className="font-semibold mb-2">How OAS is Calculated:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Residency-based (not work-based)</li>
                <li>Need 40 years in Canada for full amount</li>
                <li>Minimum 10 years for partial pension</li>
                <li>Automatic 10% boost at age 75</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Income Testing (Clawback):</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Starts at individual income over $90,997</li>
                <li>Complete clawback at $148,451+ (ages 65-74)</li>
              </ul>
            </div>
          </div>
        }
      />
    </motion.div>
  );
};

export default IncomeGoals;
