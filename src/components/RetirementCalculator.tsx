
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "./calculator/CalculatorLayout";
import AboutYou from "./calculator/AboutYou";
import CurrentSavings from "./calculator/CurrentSavings";
import IncomeGoals from "./calculator/IncomeGoals";
import Results from "./calculator/Results";
import { RetirementData } from "./calculator/types";

const RetirementCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RetirementData>({
    currentAge: 30,
    retirementAge: 65,
    province: "ON",
    maritalStatus: "single",
    rrspBalance: 0,
    tfsaBalance: 0,
    otherSavings: 0,
    nonRegisteredSavings: 0,
    monthlyContributions: 0,
    expectedReturn: 0.06,
    desiredIncome: 60000,
    cppBenefits: 12000,
    oasBenefits: 8700,
    companyPension: 0,
    additionalIncome: 0,
  });

  const updateData = (updates: Partial<RetirementData>) => {
    setData(prev => ({ ...prev, ...updates }));
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
        return null;
    }
  };

  return (
    <CalculatorLayout currentStep={currentStep - 1} totalSteps={4}>
      <div className="step-content">
        {renderStep()}
        
        {/* Modern Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200 bg-gray-50/30 mt-8 -mx-12 px-12 pb-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-caption text-text-secondary">
              Step {currentStep} of 4
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    step <= currentStep ? 'bg-brand-accent' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="btn-primary"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={() => window.print()}
              className="btn-accent"
            >
              Save Results
            </button>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
