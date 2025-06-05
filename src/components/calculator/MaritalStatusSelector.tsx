
import React from 'react';
import { User, Heart, Users, UserMinus } from 'lucide-react';
import FormField from './FormField';

interface MaritalStatusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const MaritalStatusSelector = ({ value, onChange }: MaritalStatusSelectorProps) => {
  const options = [
    { id: 'single', label: 'Single', icon: User },
    { id: 'married', label: 'Married', icon: Heart },
    { id: 'common-law', label: 'Common-law', icon: Users },
    { id: 'divorced', label: 'Divorced', icon: UserMinus }
  ];

  return (
    <FormField
      label="Marital Status"
      value={value}
      onChange={onChange}
      tooltip="Relationship Impact: Couples can reduce taxes through income splitting, shared expenses mean lower individual retirement needs, and survivor benefits provide additional security."
    >
      <div className="marital-status-grid">
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              className={`marital-option ${value === option.id ? 'selected' : ''}`}
              onClick={() => onChange(option.id)}
            >
              <IconComponent className="marital-icon" />
              <span className="marital-label">{option.label}</span>
            </button>
          );
        })}
      </div>
    </FormField>
  );
};

export default MaritalStatusSelector;
