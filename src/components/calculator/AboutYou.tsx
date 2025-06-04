
import { CalculatorData } from "./types";
import ExplanationCard from "./ExplanationCard";

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
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
            />
            <ExplanationCard
              title="Current Age"
              explanation="This is how old you are right now. Your current age helps us calculate how many years you have to save before retirement."
              thingsToConsider="Most Canadians begin focused retirement planning between ages 30-40, but it's never too early or too late to start!"
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
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
            />
            <ExplanationCard
              title="Planned Retirement Age"
              explanation="This is the age when you plan to stop working full-time and begin living off your retirement savings and other income sources."
              thingsToConsider="The standard retirement age in Canada is 65, which is when you can receive full CPP benefits. However, many Canadians retire between 60-70. Retiring earlier means you need more savings, while delaying retirement can significantly increase your financial security. Working just 2-3 years longer can increase your retirement security by 25% or more."
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
          <ExplanationCard
            title="Province/Territory"
            explanation="Your location in Canada affects tax rates, healthcare coverage, and certain retirement benefits."
            thingsToConsider="Retirement costs can vary significantly by province. Quebec has its own pension plan (QPP) instead of CPP. Some provinces like Ontario have higher living costs but may offer better healthcare services for seniors."
          />
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
          <ExplanationCard
            title="Marital Status"
            explanation="Your relationship status affects retirement planning through potential income splitting, shared expenses, and survivor benefits."
            thingsToConsider="Couples can often reduce taxes through income splitting strategies. Single retirees typically need 70-80% of a couple's income to maintain a similar lifestyle due to shared housing and other costs."
          />
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
