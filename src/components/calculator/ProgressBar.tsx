
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
        <div className="absolute top-6 left-0 w-full h-0.5 bg-border-color">
          <div 
            className="h-full bg-brand-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <Tooltip key={step.number} content={step.tooltip}>
            <div className="flex flex-col items-center relative z-10 cursor-help">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                  step.number <= currentStep
                    ? "bg-brand-primary border-brand-primary text-white shadow-lg"
                    : "bg-white border-border-color text-text-tertiary"
                }`}
              >
                {step.number <= currentStep && step.number < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              
              <div className="mt-4 text-center">
                <div className={`font-medium text-sm transition-colors duration-300 ${
                  step.number <= currentStep ? "text-brand-secondary" : "text-text-tertiary"
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
