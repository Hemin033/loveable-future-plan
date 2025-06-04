
import Tooltip from "./Tooltip";

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { 
    number: 1, 
    title: "About You",
    tooltip: "Basic information about you that helps us personalize your retirement plan."
  },
  { 
    number: 2, 
    title: "Current Savings",
    tooltip: "Information about what you've already saved for retirement."
  },
  { 
    number: 3, 
    title: "Income & Goals",
    tooltip: "Details about your income needs and other sources of retirement income."
  },
  { 
    number: 4, 
    title: "Results",
    tooltip: "Your personalized retirement projection and recommendations."
  }
];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-px bg-gray-200">
          <div 
            className="h-full bg-gray-900 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <Tooltip key={step.number} content={step.tooltip}>
            <div className="flex flex-col items-center relative z-10 cursor-help">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all ${
                  step.number <= currentStep
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {step.number <= currentStep && step.number < currentStep ? (
                  <span>✓</span>
                ) : (
                  step.number
                )}
              </div>
              
              <div className="mt-3 text-center">
                <div className={`font-medium text-sm ${
                  step.number <= currentStep ? "text-gray-900" : "text-gray-400"
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
