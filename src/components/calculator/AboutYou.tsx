
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium text-gray-900 mb-2">About You</h2>
        <p className="text-gray-600">Let's start with some basic information about yourself</p>
      </div>

      <div className="space-y-8">
        {/* Age Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Age
            </label>
            <input
              type="number"
              value={data.currentAge}
              onChange={(e) => updateData({ currentAge: parseInt(e.target.value) || 18 })}
              min="18"
              max="80"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded text-lg focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Planned Retirement Age
            </label>
            <input
              type="number"
              value={data.retirementAge}
              onChange={(e) => updateData({ retirementAge: Math.max(data.currentAge + 1, parseInt(e.target.value) || 65) })}
              min={data.currentAge + 1}
              max="80"
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded text-lg focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Province/Territory
          </label>
          <select
            value={data.province}
            onChange={(e) => updateData({ province: e.target.value })}
            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => updateData({ maritalStatus: e.target.value })}
            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          >
            {maritalStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded">
          <h3 className="font-medium text-gray-900 mb-3">Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>You are {data.currentAge} years old and plan to retire at {data.retirementAge}.</p>
            <p>You have {data.retirementAge - data.currentAge} years to save for retirement.</p>
            <p>You live in {data.province} and your marital status is {data.maritalStatus.toLowerCase()}.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutYou;
