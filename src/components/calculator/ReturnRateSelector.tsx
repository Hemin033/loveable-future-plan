
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import SmartTooltip from "./SmartTooltip";

interface ReturnOption {
  id: string;
  rate: string;
  value: number;
  label: string;
  description: string;
  risk: string;
  color: string;
}

interface ReturnRateSelectorProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const ReturnRateSelector = ({ value, onChange, className = "" }: ReturnRateSelectorProps) => {
  const [selectedRate, setSelectedRate] = useState(
    value >= 0.065 ? 'growth' : 
    value >= 0.055 ? 'balanced' : 'conservative'
  );

  const returnOptions: ReturnOption[] = [
    {
      id: 'conservative',
      rate: '4-5%',
      value: 0.045,
      label: 'Conservative',
      description: '30% stocks, 70% bonds',
      risk: 'Low',
      color: 'var(--success)'
    },
    {
      id: 'balanced',
      rate: '5-6%',
      value: 0.055,
      label: 'Balanced',
      description: '60% stocks, 40% bonds',
      risk: 'Medium',
      color: 'var(--brand-primary)'
    },
    {
      id: 'growth',
      rate: '6-7%',
      value: 0.065,
      label: 'Growth',
      description: '80% stocks, 20% bonds',
      risk: 'Higher',
      color: 'var(--brand-accent)'
    }
  ];

  const handleOptionSelect = (option: ReturnOption) => {
    setSelectedRate(option.id);
    onChange(option.value);
  };

  return (
    <div className={`return-selector ${className}`}>
      <div className="field-label">
        Expected Annual Return
        <SmartTooltip content="Based on historical Canadian market performance and typical asset allocation strategies">
        </SmartTooltip>
      </div>
      
      <div className="return-grid">
        {returnOptions.map((option) => (
          <div
            key={option.id}
            className={`return-card ${selectedRate === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="return-rate" style={{ color: option.color }}>
              {option.rate}
            </div>
            <div className="return-label">{option.label}</div>
            <div className="return-desc">{option.description}</div>
            <div className="flex items-center justify-center gap-2 text-small mt-2">
              <span className="text-text-muted">Risk:</span>
              <span 
                className="font-semibold"
                style={{ color: option.color }}
              >
                {option.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="quick-tip">
        <Lightbulb className="tip-icon" />
        <span>
          A diversified portfolio of Canadian and global stocks has historically returned 6-7% annually over the long term.
        </span>
      </div>
    </div>
  );
};

export default ReturnRateSelector;
