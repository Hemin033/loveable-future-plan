
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./calculator/ProgressBar";
import AboutYou from "./calculator/AboutYou";
import CurrentSavings from "./calculator/CurrentSavings";
import IncomeGoals from "./calculator/IncomeGoals";
import Results from "./calculator/Results";
import { CalculatorData } from "./calculator/types";

const RetirementCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    currentAge: 35,
    retirementAge: 65,
    province: "Ontario",
    maritalStatus: "Single",
    rrspBalance: 25000,
    tfsaBalance: 15000,
    pensionValue: 0,
    otherSavings: 0,
    monthlyContributions: 500,
    annualIncome: 75000,
    incomeGrowth: 3,
    retirementIncomePercent: 70,
    expectedCPP: 808,
    expectedOAS: 728,
    riskTolerance: "moderate"
  });

  const updateData = (newData: Partial<CalculatorData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AboutYou data={data} updateData={updateData} />;
      case 2:
        return <CurrentSavings data={data} updateData={updateData} />;
      case 3:
        return <IncomeGoals data={data} updateData={updateData} />;
      case 4:
        return <Results data={data} />;
      default:
        return <AboutYou data={data} updateData={updateData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Retirement Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with our comprehensive retirement planning tool
          </p>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Step Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                {renderStep()}
                
                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all transform hover:-translate-y-0.5 shadow-lg"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-lg"
                    >
                      Start Over
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Age:</span>
                  <span className="font-medium">{data.currentAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retirement Age:</span>
                  <span className="font-medium">{data.retirementAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years to Retirement:</span>
                  <span className="font-medium">{data.retirementAge - data.currentAge}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Savings:</span>
                  <span className="font-medium">
                    ${(data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Contributions:</span>
                  <span className="font-medium">${data.monthlyContributions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-medium">${data.annualIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
