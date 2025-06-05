
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "./calculator/ProgressBar";
import AboutYou from "./calculator/AboutYou";
import CurrentSavings from "./calculator/CurrentSavings";
import IncomeGoals from "./calculator/IncomeGoals";
import Results from "./calculator/Results";
import InfoModal from "./calculator/InfoModal";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border-color">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-display text-brand-secondary">
              Retirement Planning Calculator
            </h1>
            <p className="text-body text-text-secondary max-w-3xl mx-auto">
              Welcome to your retirement planning journey! This calculator is designed to help you understand your retirement needs, even if you're just getting started with financial planning. We'll explain everything along the way in simple terms, so you can make informed decisions about your future.
            </p>
            <div className="flex items-center justify-center space-x-6 text-caption text-text-tertiary">
              <span>• Takes 3-5 minutes</span>
              <span>• Your information stays private</span>
              <span>• Get personalized recommendations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface border-b border-border-color">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <ProgressBar currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="card-elevated">
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-border-color">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary"
            >
              Previous
            </Button>
            
            <div className="text-caption text-text-secondary">
              Step {currentStep} of 4
            </div>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={() => window.print()}
                className="btn-primary"
              >
                Save Results
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-surface border-t border-border-color mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h3 className="text-h3 text-brand-secondary">Need Help?</h3>
            <p className="text-body text-text-secondary">
              This calculator provides estimates based on your inputs. For personalized financial advice, consider consulting with a qualified financial advisor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
