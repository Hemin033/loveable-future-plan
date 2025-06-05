
import { useState } from "react";
import { Lightbulb } from "lucide-react";

interface ReturnOption {
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
    value >= 0.065 ? '6-7%' : 
    value >= 0.055 ? '5-6%' : '4-5%'
  );

  const returnOptions: ReturnOption[] = [
    {
      rate: '4-5%',
      value: 0.045,
      label: 'Conservative',
      description: '30% stocks, 70% bonds',
      risk: 'Low',
      color: 'var(--success)'
    },
    {
      rate: '5-6%',
      value: 0.055,
      label: 'Balanced',
      description: '60% stocks, 40% bonds',
      risk: 'Medium',
      color: 'var(--brand-primary)'
    },
    {
      rate: '6-7%',
      value: 0.065,
      label: 'Growth',
      description: '80% stocks, 20% bonds',
      risk: 'Higher',
      color: 'var(--brand-accent)'
    }
  ];

  const handleOptionSelect = (option: ReturnOption) => {
    setSelectedRate(option.rate);
    onChange(option.value);
  };

  return (
    <div className={`return-rate-selector ${className}`}>
      <div className="mb-6">
        <label className="text-h3 text-text-primary font-medium mb-2 block">
          Expected Annual Return
        </label>
        <p className="text-caption text-text-secondary">
          Choose an investment strategy based on your risk tolerance and timeline.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {returnOptions.map((option) => (
          <div
            key={option.rate}
            className={`
              card-interactive cursor-pointer transition-all duration-300
              ${selectedRate === option.rate ? 'selected' : ''}
            `}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="text-center">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: option.color }}
              >
                {option.rate}
              </div>
              <div className="text-h3 text-text-primary font-semibold mb-1">
                {option.label}
              </div>
              <div className="text-caption text-text-secondary mb-3">
                {option.description}
              </div>
              <div className="flex items-center justify-center gap-2 text-small">
                <span className="text-text-muted">Risk:</span>
                <span 
                  className="font-semibold"
                  style={{ color: option.color }}
                >
                  {option.risk}
                </span>
              </div>
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
