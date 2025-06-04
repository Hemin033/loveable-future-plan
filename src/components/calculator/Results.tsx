
import { motion } from "framer-motion";
import { CalculatorData, RetirementResults } from "./types";

interface ResultsProps {
  data: CalculatorData;
}

const Results = ({ data }: ResultsProps) => {
  const calculateResults = (data: CalculatorData): RetirementResults => {
    const yearsToRetirement = data.retirementAge - data.currentAge;
    const currentSavings = data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings;
    const annualContribution = data.monthlyContributions * 12;
    
    // Return rates based on risk tolerance
    const returnRates = {
      conservative: { pre: 0.045, post: 0.035 },
      moderate: { pre: 0.065, post: 0.045 },
      aggressive: { pre: 0.085, post: 0.060 }
    };
    
    const rates = returnRates[data.riskTolerance];
    
    // Calculate savings at retirement
    let savingsAtRetirement = currentSavings;
    for (let year = 0; year < yearsToRetirement; year++) {
      savingsAtRetirement = savingsAtRetirement * (1 + rates.pre) + annualContribution;
    }
    
    // Calculate final income and retirement needs
    const finalIncome = data.annualIncome * Math.pow(1 + data.incomeGrowth / 100, yearsToRetirement);
    const retirementIncomeNeeded = finalIncome * (data.retirementIncomePercent / 100);
    const governmentBenefits = (data.expectedCPP + data.expectedOAS) * 12;
    const requiredFromSavings = Math.max(0, retirementIncomeNeeded - governmentBenefits);
    
    // Calculate sustainability
    let balance = savingsAtRetirement;
    let withdrawal = requiredFromSavings;
    const inflationRate = 0.025;
    let yearsMoneyWillLast = 0;
    
    for (let year = 0; year < 35; year++) {
      if (balance <= 0) break;
      balance -= withdrawal;
      if (balance > 0) {
        yearsMoneyWillLast = year + 1;
        balance *= (1 + rates.post);
        withdrawal *= (1 + inflationRate);
      }
    }
    
    // Determine sustainability
    let sustainability: "good" | "needs-improvement" | "insufficient";
    if (yearsMoneyWillLast >= 25) {
      sustainability = "good";
    } else if (yearsMoneyWillLast >= 15) {
      sustainability = "needs-improvement";
    } else {
      sustainability = "insufficient";
    }
    
    // Generate tips
    const tips: string[] = [];
    if (data.monthlyContributions < data.annualIncome * 0.1 / 12) {
      tips.push("Consider increasing your monthly contributions to 10% of your income");
    }
    if (data.riskTolerance === "conservative" && data.currentAge < 50) {
      tips.push("You might benefit from a more aggressive investment strategy given your age");
    }
    if (data.retirementIncomePercent > 80) {
      tips.push("Consider if you really need 80%+ of your income in retirement");
    }
    if (currentSavings < data.annualIncome) {
      tips.push("Try to build up savings equal to at least one year of income");
    }
    
    return {
      savingsAtRetirement,
      monthlyIncomeNeeded: retirementIncomeNeeded / 12,
      monthlyGovernmentBenefits: governmentBenefits / 12,
      yearsMoneyWillLast,
      sustainability,
      tips
    };
  };

  const results = calculateResults(data);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getSustainabilityConfig = (sustainability: string) => {
    switch (sustainability) {
      case "good":
        return {
          color: "green",
          icon: "✅",
          message: "Your retirement plan looks sustainable!",
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200"
        };
      case "needs-improvement":
        return {
          color: "yellow",
          icon: "⚠️",
          message: "Your plan needs improvements",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200"
        };
      default:
        return {
          color: "red",
          icon: "❌",
          message: "Current plan insufficient",
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200"
        };
    }
  };

  const sustainabilityConfig = getSustainabilityConfig(results.sustainability);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-light text-gray-900 mb-2">Your Retirement Plan</h2>
        <p className="text-gray-600">Here's how your retirement savings plan looks</p>
      </div>

      {/* Sustainability Banner */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={`${sustainabilityConfig.bgColor} ${sustainabilityConfig.borderColor} border-2 rounded-xl p-6 text-center`}
      >
        <div className="text-4xl mb-2">{sustainabilityConfig.icon}</div>
        <h3 className={`text-2xl font-semibold ${sustainabilityConfig.textColor}`}>
          {sustainabilityConfig.message}
        </h3>
        <p className={`mt-2 ${sustainabilityConfig.textColor}`}>
          Your money is projected to last {results.yearsMoneyWillLast} years in retirement
        </p>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h4 className="text-sm font-medium text-gray-600 mb-2">Savings at Retirement</h4>
          <div className="text-3xl font-bold text-green-600">{formatCurrency(results.savingsAtRetirement)}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h4 className="text-sm font-medium text-gray-600 mb-2">Monthly Income Needed</h4>
          <div className="text-3xl font-bold text-blue-600">{formatCurrency(results.monthlyIncomeNeeded)}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h4 className="text-sm font-medium text-gray-600 mb-2">Government Benefits</h4>
          <div className="text-3xl font-bold text-purple-600">{formatCurrency(results.monthlyGovernmentBenefits)}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h4 className="text-sm font-medium text-gray-600 mb-2">Years Money Will Last</h4>
          <div className="text-3xl font-bold text-orange-600">{results.yearsMoneyWillLast}</div>
        </motion.div>
      </div>

      {/* Tips Section */}
      {results.tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommendations to Improve Your Plan</h3>
          <ul className="space-y-2">
            {results.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-blue-800">
                <span className="text-blue-600 mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Current Situation</h4>
            <div className="space-y-1 text-gray-600">
              <div>Current age: {data.currentAge}</div>
              <div>Retirement age: {data.retirementAge}</div>
              <div>Years to retirement: {data.retirementAge - data.currentAge}</div>
              <div>Current savings: {formatCurrency(data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings)}</div>
              <div>Monthly contributions: {formatCurrency(data.monthlyContributions)}</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Assumptions</h4>
            <div className="space-y-1 text-gray-600">
              <div>Income growth: {data.incomeGrowth}% annually</div>
              <div>Investment return: {data.riskTolerance} risk profile</div>
              <div>Retirement income target: {data.retirementIncomePercent}%</div>
              <div>CPP/QPP: {formatCurrency(data.expectedCPP)}/month</div>
              <div>OAS: {formatCurrency(data.expectedOAS)}/month</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Results;
