import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModernProgressBar from "./calculator/ModernProgressBar";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-surface">
      {/* Modern Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-surface/95">
        <div className="container-responsive py-6">
          <div className="text-center space-y-2">
            <h1 className="text-display text-brand-primary font-bold tracking-tight">
              Canadian Retirement Planner
            </h1>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Get a personalized retirement strategy in just 5 minutes. We'll show you exactly how much to save and the best strategies for your situation.
            </p>
            <div className="flex items-center justify-center space-x-8 text-caption text-text-muted mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Takes 3-5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Your data stays private</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Canadian-specific advice</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface/50 border-b border-border/50 sticky top-[140px] z-30 backdrop-blur-sm">
        <div className="container-responsive">
          <ModernProgressBar currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-responsive py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elevated animate-fade-in">
            <CardContent className="p-0">
              {renderStep()}
              
              {/* Modern Navigation */}
              <div className="flex justify-between items-center p-8 border-t border-border bg-gray-50/30">
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-surface border-t border-border mt-16">
        <div className="container-responsive py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-caption font-medium">Your information is secure and private</span>
            </div>
            <p className="text-caption text-text-muted max-w-2xl mx-auto">
              This calculator provides estimates for educational purposes. For personalized advice, consider consulting with a qualified financial advisor. Calculations are based on current Canadian tax laws and benefit structures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
