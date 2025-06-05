
import { forwardRef } from "react";
import SmartTooltip from "./SmartTooltip";
import ExpandableHelp from "./ExpandableHelp";

interface ModernInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'currency';
  placeholder?: string;
  tooltip?: string;
  helpTitle?: string;
  helpItems?: string[];
  quickTip?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  tooltip,
  helpTitle,
  helpItems,
  quickTip,
  error,
  disabled = false,
  className = ""
}, ref) => {
  const formatValue = (val: string | number) => {
    if (type === 'currency' && typeof val === 'number') {
      return val.toLocaleString('en-CA');
    }
    return val.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'currency') {
      // Remove formatting for currency inputs
      const rawValue = e.target.value.replace(/[^0-9.]/g, '');
      onChange(rawValue);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-h3 text-text-primary font-medium">
          {label}
        </label>
        {tooltip && <SmartTooltip content={tooltip} />}
      </div>
      
      <div className="relative">
        {type === 'currency' && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary font-medium">
            $
          </span>
        )}
        <input
          ref={ref}
          type={type === 'currency' ? 'text' : type}
          value={formatValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${
            type === 'currency' ? 'pl-8 pr-4 text-right font-medium' : ''
          } ${error ? 'input-error' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
      
      {error && (
        <p className="text-caption text-error font-medium">{error}</p>
      )}
      
      {helpTitle && helpItems && (
        <ExpandableHelp
          title={helpTitle}
          items={helpItems}
          quickTip={quickTip}
        />
      )}
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput;
