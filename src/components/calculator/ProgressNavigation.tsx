
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  subtitle: string;
}

interface ProgressNavigationProps {
  currentStep: number;
  steps: Step[];
}

const ProgressNavigation = ({ currentStep, steps }: ProgressNavigationProps) => (
  <div className="progress-navigation">
    <div className="progress-container">
      {steps.map((step, index) => (
        <div key={index} className="progress-step-container">
          <div className={`progress-step ${
            index < currentStep ? 'completed' : 
            index === currentStep ? 'active' : 'inactive'
          }`}>
            {index < currentStep ? (
              <Check className="step-icon" />
            ) : (
              <span className="step-number">{index + 1}</span>
            )}
          </div>
          <div className="step-info">
            <span className="step-title">{step.title}</span>
            <span className="step-subtitle">{step.subtitle}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`progress-line ${index < currentStep ? 'completed' : ''}`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProgressNavigation;
