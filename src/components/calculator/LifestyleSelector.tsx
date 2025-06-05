
import { useState } from "react";
import { Info } from "lucide-react";

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
      id: 'conservative',
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
      title: 'Custom',
      percentage: null,
      description: 'Set your own income replacement target',
      features: ['Flexible planning', 'Personalized goals']
    }
  ];

  return (
    <div className={`lifestyle-selector ${className}`}>
      <div className="mb-6">
        <h3 className="text-h3 text-text-primary font-semibold mb-2">
          What kind of lifestyle would you like in retirement?
        </h3>
        <p className="text-body text-text-secondary">
          Choose how much of your current income you'll need to maintain your desired lifestyle.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {lifestyleOptions.map((option) => (
          <div
            key={option.id}
            className={`
              card-interactive cursor-pointer
              ${selectedLifestyle === option.id ? 'selected' : ''}
            `}
            onClick={() => onLifestyleChange(option.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-h3 text-text-primary font-semibold">
                {option.title}
              </h4>
              {option.percentage && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-accent">
                    {option.percentage}%
                  </div>
                  <div className="text-small text-text-muted">
                    of current income
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-caption text-text-secondary mb-4">
              {option.description}
            </p>
            
            <ul className="space-y-2">
              {option.features.map((feature, index) => (
                <li key={index} className="help-item text-small">
                  {feature}
                </li>
              ))}
            </ul>
            
            {option.id === 'custom' && selectedLifestyle === 'custom' && (
              <div className="mt-4 p-4 bg-brand-light rounded-lg">
                <label className="block text-caption font-medium text-text-primary mb-2">
                  Income replacement percentage:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="40"
                    max="100"
                    value={customPercentage}
                    onChange={(e) => onCustomPercentageChange(parseInt(e.target.value) || 70)}
                    className="input-field w-20 text-center"
                  />
                  <span className="text-body font-medium">%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-start gap-2 p-4 bg-light-tint border border-brand-light rounded-lg">
        <Info className="w-4 h-4 text-brand-accent mt-1 flex-shrink-0" />
        <span className="text-caption text-text-secondary">
          Most financial advisors recommend 70-80% of pre-retirement income for a comfortable retirement.
        </span>
      </div>
    </div>
  );
};

export default LifestyleSelector;
