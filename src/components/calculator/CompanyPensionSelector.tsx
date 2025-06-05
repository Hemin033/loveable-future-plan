
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import SmartTooltip from "./SmartTooltip";

interface CompanyPensionSelectorProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  className?: string;
}

const CompanyPensionSelector = ({ value, onChange, className = "" }: CompanyPensionSelectorProps) => {
  return (
    <div className={`pension-selector ${className}`}>
      <div className="field-label">
        Do you have a company pension plan?
        <SmartTooltip content="Include employer pension plans, group RRSPs, defined benefit plans, or any employer retirement contributions">
        </SmartTooltip>
      </div>
      
      <div className="yes-no-grid">
        <button 
          className={`toggle-btn ${value === true ? 'selected' : ''}`}
          onClick={() => onChange(true)}
          type="button"
        >
          <CheckCircle className="w-5 h-5" />
          Yes, I have a pension
        </button>
        <button 
          className={`toggle-btn ${value === false ? 'selected' : ''}`}
          onClick={() => onChange(false)}
          type="button"
        >
          <XCircle className="w-5 h-5" />
          No pension plan
        </button>
      </div>
      
      {value === true && (
        <div className="pension-note">
          <Lightbulb className="w-4 h-4" />
          Great! We'll factor in typical pension benefits in your retirement calculation.
        </div>
      )}
    </div>
  );
};

export default CompanyPensionSelector;
