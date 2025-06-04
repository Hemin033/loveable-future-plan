
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
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium text-gray-900 mb-4">
            Retirement Calculator
          </h1>
          
          {/* Introduction Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded p-6">
              <p className="text-gray-700 leading-relaxed">
                Welcome to your retirement planning journey! This calculator is designed to help you understand your retirement needs, even if you're just getting started with financial planning. We'll explain everything along the way in simple terms, so you can make informed decisions about your future.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Main Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-200 rounded p-8"
            >
              {renderStep()}
              
              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
