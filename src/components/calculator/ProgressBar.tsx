
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  isDarkMode?: boolean;
}

const steps = [
  { number: 1, title: "About You", description: "Personal details", icon: "👤" },
  { number: 2, title: "Current Savings", description: "Assets & contributions", icon: "💰" },
  { number: 3, title: "Income & Goals", description: "Planning targets", icon: "🎯" },
  { number: 4, title: "Results", description: "Your retirement plan", icon: "📊" }
];

const ProgressBar = ({ currentStep, isDarkMode = false }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl ${
        isDarkMode 
          ? 'bg-white/5 border-white/10' 
          : 'bg-white/30 border-white/40'
      }`}>
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className={`absolute top-8 left-0 w-full h-1 rounded-full ${
            isDarkMode ? 'bg-white/20' : 'bg-gray-300/50'
          } z-0`}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">
              <motion.div
                className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-semibold text-lg transition-all duration-500 ${
                  step.number <= currentStep
                    ? isDarkMode
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-2xl shadow-blue-500/25"
                      : "bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-2xl shadow-blue-500/25"
                    : isDarkMode
                      ? "bg-white/10 border-white/20 text-white/60 backdrop-blur-sm"
                      : "bg-white/50 border-gray-300/50 text-gray-500 backdrop-blur-sm"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  scale: step.number === currentStep ? 1.1 : 1,
                  y: step.number === currentStep ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.number <= currentStep && step.number < currentStep ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-2xl"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <span className="text-xl">{step.icon}</span>
                )}
              </motion.div>
              
              <div className="mt-4 text-center">
                <motion.div 
                  className={`font-semibold text-sm transition-colors duration-300 ${
                    step.number <= currentStep 
                      ? isDarkMode ? "text-white" : "text-gray-900"
                      : isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  animate={{
                    scale: step.number === currentStep ? 1.05 : 1,
                  }}
                >
                  {step.title}
                </motion.div>
                <div className={`text-xs mt-1 hidden sm:block transition-colors duration-300 ${
                  step.number <= currentStep 
                    ? isDarkMode ? "text-gray-300" : "text-gray-600"
                    : isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
