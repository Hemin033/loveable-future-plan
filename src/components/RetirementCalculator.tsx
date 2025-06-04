
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import ProgressBar from "./calculator/ProgressBar";
import AboutYou from "./calculator/AboutYou";
import CurrentSavings from "./calculator/CurrentSavings";
import IncomeGoals from "./calculator/IncomeGoals";
import Results from "./calculator/Results";
import { CalculatorData } from "./calculator/types";

const RetirementCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Glass overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with modern glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`backdrop-blur-xl rounded-3xl p-8 mb-8 border ${
            isDarkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/30 border-white/40'
          } shadow-2xl`}>
            <div className="flex justify-between items-start mb-6">
              <div className="text-left flex-1">
                <h1 className="text-5xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Premium Retirement Calculator
                </h1>
                <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
                  Plan your financial future with our comprehensive retirement planning tool
                </p>
              </div>
              
              {/* Dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 rounded-2xl backdrop-blur-sm transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 text-yellow-400 hover:bg-white/20' 
                    : 'bg-gray-900/10 text-gray-700 hover:bg-gray-900/20'
                }`}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} isDarkMode={isDarkMode} />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 mt-12">
          {/* Main Content - Adaptive width based on step */}
          <div className={`${currentStep === 4 ? 'col-span-12' : 'col-span-12 lg:col-span-8'} order-2 lg:order-1`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/40 border-white/50'
                }`}
              >
                {renderStep()}
                
                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200/30">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      currentStep === 1
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                        : isDarkMode 
                          ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                          : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 backdrop-blur-sm'
                    } shadow-lg`}
                  >
                    Previous
                  </motion.button>
                  
                  {currentStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Step
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:from-green-700 hover:to-blue-700"
                    >
                      Start Over
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Only show on steps 1-3 */}
          {currentStep < 4 && (
            <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`backdrop-blur-xl rounded-3xl p-6 border shadow-2xl sticky top-8 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/40 border-white/50'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Live Summary
                </h3>
                
                <div className="space-y-4">
                  {/* Age Timeline Visualization */}
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode ? 'bg-white/5' : 'bg-white/30'
                  }`}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Age Timeline</span>
                    </div>
                    <div className="relative h-3 bg-gray-200/30 rounded-full mb-2">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${((data.currentAge - 18) / (data.retirementAge - 18)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>18</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {data.currentAge} → {data.retirementAge}
                      </span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>80</span>
                    </div>
                  </div>

                  {/* Key Metrics Cards */}
                  {[
                    { 
                      label: "Years to Retirement", 
                      value: data.retirementAge - data.currentAge,
                      suffix: " years",
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      label: "Total Current Savings", 
                      value: (data.rrspBalance + data.tfsaBalance + data.pensionValue + data.otherSavings).toLocaleString(),
                      prefix: "$",
                      color: "from-green-500 to-emerald-500"
                    },
                    { 
                      label: "Monthly Contributions", 
                      value: data.monthlyContributions.toLocaleString(),
                      prefix: "$",
                      color: "from-purple-500 to-pink-500"
                    },
                    { 
                      label: "Annual Income", 
                      value: data.annualIncome.toLocaleString(),
                      prefix: "$",
                      color: "from-orange-500 to-red-500"
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-2xl backdrop-blur-sm ${
                        isDarkMode ? 'bg-white/5' : 'bg-white/30'
                      } border border-white/20`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                            {metric.label}
                          </div>
                          <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {metric.prefix}{metric.value}{metric.suffix}
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${metric.color}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
