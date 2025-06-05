
import React from "react";
import { RetirementData } from "./types";
import ModernInput from "./ModernInput";
import MetricCard from "./MetricCard";
import SmartTooltip from "./SmartTooltip";

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
  const yearsToRetirement = Math.max(0, data.retirementAge - data.currentAge);

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-h1 text-text-primary">About You</h2>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          Let's start with some basic information to create your personalized retirement strategy.
        </p>
      </div>

      {/* Years to Retirement Highlight */}
      <div className="flex justify-center">
        <MetricCard
          value={yearsToRetirement}
          label="years until retirement"
          size="large"
          className="text-center border-2 border-primary-brand/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Age */}
        <div className="space-y-6">
          <ModernInput
            label="Current Age"
            value={data.currentAge}
            onChange={(value) => updateData({ currentAge: parseInt(value) || 0 })}
            type="number"
            placeholder="30"
            tooltip="Your age today - used to calculate your retirement timeline"
            helpTitle="Why Your Age Matters"
            helpItems={[
              "More time means more compound growth potential",
              "Starting at 25 vs 35 can double your retirement fund",
              "Even starting at 50+ can significantly impact your future"
            ]}
            quickTip="The best time to start was 20 years ago. The second best time is now."
          />
        </div>

        {/* Retirement Age */}
        <div className="space-y-6">
          <ModernInput
            label="Planned Retirement Age"
            value={data.retirementAge}
            onChange={(value) => updateData({ retirementAge: parseInt(value) || 0 })}
            type="number"
            placeholder="65"
            tooltip="When you plan to stop working full-time"
            helpTitle="Choosing Your Retirement Age"
            helpItems={[
              "Standard retirement age in Canada is 65 (full CPP benefits)",
              "Retiring early (60-64) reduces CPP by 0.6% per month",
              "Delaying retirement (66-70) increases CPP by 0.7% per month"
            ]}
            quickTip="Every year you delay retirement can increase your financial security significantly."
          />
        </div>

        {/* Province */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-h3 text-text-primary font-medium">
              Province/Territory
            </label>
            <SmartTooltip content="Your location affects tax rates and retirement benefits" />
          </div>
          
          <select
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
          
          <div className="help-card">
            <div className="help-title">Regional Differences</div>
            <ul className="help-list">
              <li className="help-item">Quebec uses QPP instead of CPP</li>
              <li className="help-item">Provincial tax rates vary significantly</li>
              <li className="help-item">Some provinces offer additional senior benefits</li>
            </ul>
          </div>
        </div>

        {/* Marital Status */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-h3 text-text-primary font-medium">
              Marital Status
            </label>
            <SmartTooltip content="Affects tax treatment and potential income splitting" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {maritalStatuses.map((status) => (
              <button
                key={status.value}
                type="button"
                onClick={() => updateData({ maritalStatus: status.value })}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  data.maritalStatus === status.value
                    ? 'border-primary-brand bg-primary-brand/5 text-primary-brand'
                    : 'border-border bg-surface hover:border-primary-brand/30'
                }`}
              >
                <div className="font-medium">{status.label}</div>
              </button>
            ))}
          </div>
          
          <div className="help-card">
            <div className="help-title">Relationship Impact</div>
            <ul className="help-list">
              <li className="help-item">Couples can reduce taxes through income splitting</li>
              <li className="help-item">Shared expenses mean lower individual retirement needs</li>
              <li className="help-item">Survivor benefits provide additional security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-r from-primary-brand/5 to-accent/5 rounded-xl p-6 border border-primary-brand/10">
        <h3 className="text-h3 text-text-primary mb-4">Your Retirement Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-h2 font-bold text-primary-brand">{data.currentAge}</div>
            <div className="text-caption text-text-secondary">Current Age</div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-accent">{yearsToRetirement}</div>
            <div className="text-caption text-text-secondary">Years to Save</div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-success">{data.retirementAge}</div>
            <div className="text-caption text-text-secondary">Retirement Age</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutYou;
