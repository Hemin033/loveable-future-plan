
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "About You", description: "Personal details" },
  { number: 2, title: "Current Savings", description: "Assets & contributions" },
  { number: 3, title: "Income & Goals", description: "Planning targets" },
  { number: 4, title: "Results", description: "Your retirement plan" }
];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-green-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center relative z-10">
            <motion.div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 ${
                step.number <= currentStep
                  ? "bg-green-500 border-green-500 text-white shadow-lg"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              animate={{
                scale: step.number === currentStep ? 1.1 : 1,
                boxShadow: step.number === currentStep ? "0 8px 25px rgba(34, 197, 94, 0.3)" : "none"
              }}
            >
              {step.number <= currentStep && step.number < currentStep ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              ) : (
                step.number
              )}
            </motion.div>
            
            <div className="mt-3 text-center">
              <div className={`font-medium text-sm ${
                step.number <= currentStep ? "text-gray-900" : "text-gray-500"
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
