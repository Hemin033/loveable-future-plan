
import { motion } from "framer-motion";
import { CalculatorData } from "./types";

interface AboutYouProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
  "Quebec", "Saskatchewan", "Yukon"
];

const maritalStatuses = [
  "Single", "Married/Common-law", "Divorced", "Widowed"
];

const AboutYou = ({ data, updateData }: AboutYouProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-light text-gray-900 mb-2">About You</h2>
        <p className="text-gray-600">Let's start with some basic information about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Age */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Age
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateData({ currentAge: Math.max(18, data.currentAge - 1) })}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors"
            >
              −
            </button>
            <input
              type="number"
              value={data.currentAge}
              onChange={(e) => updateData({ currentAge: parseInt(e.target.value) || 18 })}
              min="18"
              max="80"
              className="flex-1 text-center text-2xl font-semibold p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              onClick={() => updateData({ currentAge: Math.min(80, data.currentAge + 1) })}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Retirement Age */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Planned Retirement Age
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateData({ retirementAge: Math.max(data.currentAge + 1, data.retirementAge - 1) })}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors"
            >
              −
            </button>
            <input
              type="number"
              value={data.retirementAge}
              onChange={(e) => updateData({ retirementAge: Math.max(data.currentAge + 1, parseInt(e.target.value) || 65) })}
              min={data.currentAge + 1}
              max="80"
              className="flex-1 text-center text-2xl font-semibold p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              onClick={() => updateData({ retirementAge: Math.min(80, data.retirementAge + 1) })}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors"
            >
              +
            </button>
          </div>
          {data.retirementAge <= data.currentAge && (
            <p className="text-red-500 text-sm">Retirement age must be greater than current age</p>
          )}
        </div>

        {/* Province */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Province/Territory
          </label>
          <select
            value={data.province}
            onChange={(e) => updateData({ province: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => updateData({ maritalStatus: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          >
            {maritalStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-medium text-blue-900 mb-2">Why we need this information</h3>
        <p className="text-blue-800 text-sm">
          Your age determines how long your money needs to grow and last. Your location affects government benefits like CPP/QPP and OAS. 
          Marital status can impact tax planning and household retirement needs.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutYou;
