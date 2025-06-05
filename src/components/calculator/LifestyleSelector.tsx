
import { Info } from "lucide-react";
import SmartTooltip from "./SmartTooltip";

interface LifestyleOption {
  id: string;
  title: string;
  percentage: number | null;
  description: string;
  features: string[];
}

interface LifestyleSelectorProps {
  selectedLifestyle: string;
  customPercentage: number;
  onLifestyleChange: (lifestyle: string) => void;
  onCustomPercentageChange: (percentage: number) => void;
  className?: string;
}

const LifestyleSelector = ({
  selectedLifestyle,
  customPercentage,
  onLifestyleChange,
  onCustomPercentageChange,
  className = ""
}: LifestyleSelectorProps) => {
  const lifestyleOptions: LifestyleOption[] = [
    {
      id: 'essential',
      title: 'Essential Lifestyle',
      percentage: 60,
      description: 'Cover basic needs with some comfort',
      features: ['Housing & utilities', 'Food & transportation', 'Basic healthcare', 'Minimal entertainment']
    },
    {
      id: 'comfortable',
      title: 'Comfortable Lifestyle',
      percentage: 70,
      description: 'Maintain your current standard of living',
      features: ['Current housing', 'Regular dining out', 'Travel occasionally', 'Hobbies & entertainment']
    },
    {
      id: 'enhanced',
      title: 'Enhanced Lifestyle',
      percentage: 80,
      description: 'Enjoy extra comforts and experiences',
      features: ['Premium housing', 'Frequent travel', 'Luxury purchases', 'Generous gifts to family']
    },
    {
      id: 'custom',
      title: 'Custom Target',
      percentage: null,
      description: 'Set your own income replacement goal',
      features: ['Flexible planning', 'Personalized goals']
    }
  ];

  return (
    <div className={`lifestyle-selector ${className}`}>
      <h3 className="text-h3 text-text-primary font-semibold mb-2">
        What kind of lifestyle would you like in retirement?
      </h3>
      <p className="text-body text-text-secondary mb-6">
        Choose how much of your current income you'll need to maintain your desired lifestyle.
      </p>
      
      <div className="lifestyle-grid">
        {lifestyleOptions.map((option) => (
          <div
            key={option.id}
            className={`lifestyle-card ${selectedLifestyle === option.id ? 'selected' : ''}`}
            onClick={() => onLifestyleChange(option.id)}
          >
            <div className="lifestyle-header">
              <h4 className="text-h3 text-text-primary font-semibold">
                {option.title}
              </h4>
              {option.percentage && (
                <div className="percentage-badge">
                  {option.percentage}%
                </div>
              )}
            </div>
            
            <p className="text-caption text-text-secondary mb-4">
              {option.description}
            </p>
            
            <ul className="space-y-2">
              {option.features.map((feature, index) => (
                <li key={index} className="text-small text-text-muted flex items-center">
                  <span className="w-2 h-2 bg-brand-accent rounded-full mr-2 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {option.id === 'custom' && selectedLifestyle === 'custom' && (
              <div className="custom-input">
                <input
                  type="number"
                  min="40"
                  max="100"
                  value={customPercentage}
                  onChange={(e) => onCustomPercentageChange(parseInt(e.target.value) || 70)}
                  placeholder="75"
                />
                <span className="text-body font-medium">% of current income</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-start gap-2 p-4 bg-light-tint border border-brand-light rounded-lg mt-6">
        <Info className="w-4 h-4 text-brand-accent mt-1 flex-shrink-0" />
        <span className="text-caption text-text-secondary">
          Most financial advisors recommend 70-80% of pre-retirement income for a comfortable retirement.
        </span>
      </div>
    </div>
  );
};

export default LifestyleSelector;
