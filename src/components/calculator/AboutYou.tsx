
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RetirementData } from "./types";
import ExplanationCard from "./ExplanationCard";

interface AboutYouProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const provinces = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "YT", label: "Yukon" },
];

const maritalStatuses = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "common-law", label: "Common-law" },
  { value: "divorced", label: "Divorced" },
];

const AboutYou = ({ data, updateData }: AboutYouProps) => {
  const yearsToRetirement = data.retirementAge - data.currentAge;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h1 text-brand-secondary">About You</h2>
        <p className="text-body text-text-secondary">
          Let's start with some basic information to personalize your retirement plan.
        </p>
      </div>

      {/* Years to Retirement Highlight */}
      <div className="card-surface text-center">
        <div className="text-display text-brand-primary font-bold">
          {yearsToRetirement}
        </div>
        <div className="text-body text-text-secondary">
          years until retirement
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Age */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentAge" className="text-h3 text-brand-secondary">
              Current Age
            </Label>
            <Input
              id="currentAge"
              type="number"
              value={data.currentAge}
              onChange={(e) => updateData({ currentAge: parseInt(e.target.value) || 0 })}
              className="input-field text-2xl font-semibold"
              min="18"
              max="75"
            />
            <p className="text-caption text-text-secondary">
              This helps us calculate how many years you have to save
            </p>
          </div>
          
          <ExplanationCard
            title="Understanding Your Timeline"
            explanation="This is how old you are right now. Your current age helps us calculate how many years you have to save before retirement."
            thingsToConsider="Most Canadians begin focused retirement planning between ages 30-40, but it's never too early or too late to start!"
          />
        </div>

        {/* Retirement Age */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retirementAge" className="text-h3 text-brand-secondary">
              Planned Retirement Age
            </Label>
            <Input
              id="retirementAge"
              type="number"
              value={data.retirementAge}
              onChange={(e) => updateData({ retirementAge: parseInt(e.target.value) || 0 })}
              className="input-field text-2xl font-semibold"
              min="55"
              max="75"
            />
            <p className="text-caption text-text-secondary">
              When you plan to stop working full-time
            </p>
          </div>
          
          <ExplanationCard
            title="Choosing Your Retirement Age"
            explanation="This is the age when you plan to stop working full-time and begin living off your retirement savings and other income sources."
            thingsToConsider="The standard retirement age in Canada is 65, which is when you can receive full CPP benefits. However, many Canadians retire between 60-70. Retiring earlier means you need more savings, while delaying retirement can significantly increase your financial security."
          />
        </div>

        {/* Province */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="province" className="text-h3 text-brand-secondary">
              Province/Territory
            </Label>
            <select
              id="province"
              value={data.province}
              onChange={(e) => updateData({ province: e.target.value })}
              className="input-field"
            >
              {provinces.map((province) => (
                <option key={province.value} value={province.value}>
                  {province.label}
                </option>
              ))}
            </select>
            <p className="text-caption text-text-secondary">
              For tax rates and benefit calculations
            </p>
          </div>
          
          <ExplanationCard
            title="Location Matters"
            explanation="Your location in Canada affects tax rates, healthcare coverage, and certain retirement benefits."
            thingsToConsider="Retirement costs can vary significantly by province. Quebec has its own pension plan (QPP) instead of CPP. Some provinces like Ontario have higher living costs but may offer better healthcare services for seniors."
          />
        </div>

        {/* Marital Status */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maritalStatus" className="text-h3 text-brand-secondary">
              Marital Status
            </Label>
            <select
              id="maritalStatus"
              value={data.maritalStatus}
              onChange={(e) => updateData({ maritalStatus: e.target.value })}
              className="input-field"
            >
              {maritalStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <p className="text-caption text-text-secondary">
              Affects tax treatment and benefits
            </p>
          </div>
          
          <ExplanationCard
            title="Relationship Impact"
            explanation="Your relationship status affects retirement planning through potential income splitting, shared expenses, and survivor benefits."
            thingsToConsider="Couples can often reduce taxes through income splitting strategies. Single retirees typically need 70-80% of a couple's income to maintain a similar lifestyle due to shared housing and other costs."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYou;
