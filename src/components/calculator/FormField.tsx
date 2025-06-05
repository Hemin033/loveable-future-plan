
import React, { useState } from 'react';
import { Info, ChevronDown, Plus, Minus } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: string;
  tooltip?: string;
  options?: Option[];
  placeholder?: string;
  children?: React.ReactNode;
}

const FormField = ({ label, value, onChange, type = "text", tooltip, options, placeholder, children }: FormFieldProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  if (children) {
    return (
      <div className="form-field">
        <div className="field-header">
          <label className="field-label">{label}</label>
          {tooltip && (
            <div className="tooltip-container">
              <button
                type="button"
                className="learn-more-btn"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <Info className="info-icon" />
                Learn more
              </button>
              {showTooltip && (
                <div className="tooltip-popup">
                  <div className="tooltip-content">
                    {tooltip}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="form-field">
      <div className="field-header">
        <label className="field-label">{label}</label>
        {tooltip && (
          <div className="tooltip-container">
            <button
              type="button"
              className="learn-more-btn"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className="info-icon" />
              Learn more
            </button>
            {showTooltip && (
              <div className="tooltip-popup">
                <div className="tooltip-content">
                  {tooltip}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="input-wrapper">
        {type === "select" ? (
          <div className="custom-select">
            <button
              type="button"
              className="select-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{value || placeholder}</span>
              <ChevronDown className="select-icon" />
            </button>
            {showDropdown && (
              <div className="select-dropdown">
                {options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="select-option"
                    onClick={() => {
                      onChange(option.value);
                      setShowDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : type === "number" ? (
          <div className="number-input">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="form-input"
              placeholder={placeholder}
            />
            <div className="number-controls">
              <button 
                type="button" 
                onClick={() => onChange(Math.max(0, (parseInt(value as string) || 0) + 1))}
                className="number-btn"
              >
                <Plus />
              </button>
              <button 
                type="button" 
                onClick={() => onChange(Math.max(0, (parseInt(value as string) || 0) - 1))}
                className="number-btn"
              >
                <Minus />
              </button>
            </div>
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="form-input"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default FormField;
