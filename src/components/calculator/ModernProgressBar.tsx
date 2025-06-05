
import SmartTooltip from "./SmartTooltip";

interface ModernProgressBarProps {
  currentStep: number;
}

const steps = [
  { 
    number: 1, 
    title: "About You",
    tooltip: "Basic information that helps us personalize your retirement plan"
  },
  { 
    number: 2, 
    title: "Current Savings",
    tooltip: "Your existing retirement savings and investment accounts"
  },
  { 
    number: 3, 
    title: "Income & Goals",
    tooltip: "Your income needs and sources of retirement income"
  },
  { 
    number: 4, 
    title: "Results",
    tooltip: "Your personalized retirement projection and recommendations"
  }
];

const ModernProgressBar = ({ currentStep }: ModernProgressBarProps) => {
  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="w-full py-8">
      <div className="progress-container">
        {/* Progress Line */}
        <div className="progress-line">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isInactive = step.number > currentStep;

          return (
            <div key={step.number} className="progress-step">
              <div
                className={`progress-circle ${
                  isActive ? 'active' : 
                  isCompleted ? 'completed' : 
                  'inactive'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              
              <div className="mt-4 text-center">
                <div className="flex items-center gap-1">
                  <span className={`font-medium text-sm transition-colors duration-300 ${
                    isActive || isCompleted ? "text-text-primary" : "text-text-muted"
                  }`}>
                    {step.title}
                  </span>
                  <SmartTooltip content={step.tooltip} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModernProgressBar;
