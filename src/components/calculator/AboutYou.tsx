
import React from "react";
import FormField from "./FormField";
import MaritalStatusSelector from "./MaritalStatusSelector";
import { RetirementData } from "./types";

interface AboutYouProps {
  data: RetirementData;
  updateData: (updates: Partial<RetirementData>) => void;
}

const AboutYou = ({ data, updateData }: AboutYouProps) => {
  const provinceOptions = [
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
    { value: "YT", label: "Yukon" }
  ];

  return (
    <div className="step-container">
      <div className="mb-8">
        <h2 className="text-h1 text-brand-primary font-bold mb-4">
          About You
        </h2>
        <p className="text-body text-text-secondary">
          Tell us a bit about yourself to get started with your personalized retirement plan.
        </p>
      </div>

      <div className="space-y-8">
        <FormField
          label="Current Age"
          type="number"
          value={data.currentAge}
          onChange={(value) => updateData({ currentAge: parseInt(value) || 0 })}
          placeholder="30"
          tooltip="Your current age helps us calculate how many years you have to save and grow your retirement funds."
        />

        <FormField
          label="Planned Retirement Age"
          type="number"
          value={data.retirementAge}
          onChange={(value) => updateData({ retirementAge: parseInt(value) || 0 })}
          placeholder="65"
          tooltip="The age you plan to retire affects how long you have to save and how many years your savings need to last."
        />

        <MaritalStatusSelector 
          value={data.maritalStatus} 
          onChange={(value) => updateData({ maritalStatus: value })} 
        />

        <FormField
          label="Province/Territory"
          type="select"
          value={data.province}
          onChange={(value) => updateData({ province: value })}
          options={provinceOptions}
          placeholder="Select your province"
          tooltip="Your province affects tax calculations and available government benefits."
        />
      </div>
    </div>
  );
};

export default AboutYou;
